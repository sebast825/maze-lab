import "jest";
import { Cell, Maze } from "@/lib/maze/types";
import { getMazeStartPoint, getNeighborsNotVisited, removeWallBetween, selectRandomPosition } from "./utils";

describe("getMazeStartPoint", () => {
  it("should return a point within maze bounds", () => {
    const maze: Maze = { rows: 10, cols: 10, cells: [] };

    const mockRandom = jest.spyOn(Math, "random");

    mockRandom.mockReturnValueOnce(0);
    mockRandom.mockReturnValueOnce(0);
    expect(getMazeStartPoint(maze)).toEqual({ x: 0, y: 0 });

    mockRandom.mockReturnValueOnce(0.999);
    mockRandom.mockReturnValueOnce(0.999);
    expect(getMazeStartPoint(maze)).toEqual({ x: 9, y: 9 });

    mockRandom.mockRestore();
  });

  it("should always return integer coordinates", () => {
    const maze: Maze = { rows: 5, cols: 5, cells: [] };
    const point = getMazeStartPoint(maze);

    expect(Number.isInteger(point.x)).toBe(true);
    expect(Number.isInteger(point.y)).toBe(true);
  });
  it("should return a point within maze bounds", () => {
    const maze: Maze = { rows: 10, cols: 10, cells: [] };

    for (let i = 0; i < 1000; i++) {
      const point = getMazeStartPoint(maze);
      expect(point.x).toBeGreaterThanOrEqual(0);
      expect(point.x).toBeLessThan(maze.cols);
      expect(point.y).toBeGreaterThanOrEqual(0);
      expect(point.y).toBeLessThan(maze.rows);
    }
  });
});


describe('getNeighborsNotVisited', () => {
  // Helper to create a test maze with custom visited states
  const createTestMaze = (rows: number, cols: number, visitedCells: string[] = []): Maze => {
    const cells: Cell[][] = []
    for (let y = 0; y < rows; y++) {
      cells[y] = []
      for (let x = 0; x < cols; x++) {
        cells[y][x] = {
          visited: visitedCells.includes(`${x},${y}`),
          walls: { north: true, south: true, east: true, west: true }
        }
      }
    }
    return { rows, cols, cells }
  }

  // Edge case: Corner cell (top-left)
  it('should return only valid neighbors from top-left corner', () => {
    const maze = createTestMaze(3, 3, [])
    const neighbors = getNeighborsNotVisited(maze, 0, 0)
    
    // From (0,0): east (1,0) and south (0,1) are valid
    // north (-1,0) and west (0,-1) are out of bounds
    expect(neighbors).toHaveLength(2)
    expect(neighbors).toContainEqual({ x: 1, y: 0 })
    expect(neighbors).toContainEqual({ x: 0, y: 1 })
  })

  // Edge case: Corner cell (top-right)
  it('should return only valid neighbors from top-right corner', () => {
    const maze = createTestMaze(3, 3, [])
    const neighbors = getNeighborsNotVisited(maze, 2, 0)
    
    expect(neighbors).toHaveLength(2)
    expect(neighbors).toContainEqual({ x: 1, y: 0 }) // west
    expect(neighbors).toContainEqual({ x: 2, y: 1 }) // south
  })

  // Edge case: Cell on top edge (not corner)
  it('should return neighbors from top edge cell excluding north', () => {
    const maze = createTestMaze(3, 3, [])
    const neighbors = getNeighborsNotVisited(maze, 1, 0)
    
    // From (1,0): north invalid, east (2,0), south (1,1), west (0,0) valid
    expect(neighbors).toHaveLength(3)
    expect(neighbors).toContainEqual({ x: 2, y: 0 })
    expect(neighbors).toContainEqual({ x: 1, y: 1 })
    expect(neighbors).toContainEqual({ x: 0, y: 0 })
  })

  // Edge case: Cell with all neighbors blocked by visited flag
  it('should return empty array when all neighbors are already visited', () => {
    // Mark all neighbors as visited
    const maze = createTestMaze(3, 3, ['1,0', '0,1', '2,1', '1,2'])
    const neighbors = getNeighborsNotVisited(maze, 1, 1)
    
    expect(neighbors).toHaveLength(0)
  })

  // Edge case: Cell with mixed visited/unvisited neighbors
  it('should return only unvisited neighbors', () => {
    // Mark only east neighbor as visited
    const maze = createTestMaze(3, 3, ['2,1'])
    const neighbors = getNeighborsNotVisited(maze, 1, 1)
    
    // From (1,1): east (2,1) visited, so excluded
    // north (1,0), south (1,2), west (0,1) unvisited
    expect(neighbors).toHaveLength(3)
    expect(neighbors).toContainEqual({ x: 1, y: 0 })
    expect(neighbors).toContainEqual({ x: 1, y: 2 })
    expect(neighbors).toContainEqual({ x: 0, y: 1 })
    expect(neighbors).not.toContainEqual({ x: 2, y: 1 })
  })

  // Valid case: Center cell in 3x3 grid with no visited neighbors
  it('should return all 4 neighbors from center cell', () => {
    const maze = createTestMaze(3, 3, [])
    const neighbors = getNeighborsNotVisited(maze, 1, 1)
    
    expect(neighbors).toHaveLength(4)
    expect(neighbors).toContainEqual({ x: 1, y: 0 }) // north
    expect(neighbors).toContainEqual({ x: 2, y: 1 }) // east
    expect(neighbors).toContainEqual({ x: 1, y: 2 }) // south
    expect(neighbors).toContainEqual({ x: 0, y: 1 }) // west
  })

  // Valid case: Large maze
  it('should handle large maze dimensions correctly', () => {
    const maze = createTestMaze(50, 50, [])
    const neighbors = getNeighborsNotVisited(maze, 25, 25)
    
    expect(neighbors).toHaveLength(4)
    expect(neighbors.every(n => 
      n.x >= 0 && n.x < 50 && n.y >= 0 && n.y < 50
    )).toBe(true)
  })
})

describe('selectRandomPosition', () => {
  // Edge case: Single neighbor
  it('should return the only neighbor when array has one element', () => {
    const neighbors = [{ x: 1, y: 2 }]
    const result = selectRandomPosition(neighbors)
    
    expect(result).toEqual({ x: 1, y: 2 })
  })

  // Edge case: Empty array (should never happen in practice, but test behavior)
  it('should return undefined when array is empty', () => {
    const neighbors: { x: number; y: number }[] = []
    const result = selectRandomPosition(neighbors)
    
    // Math.floor(Math.random() * 0) = NaN, array[NaN] = undefined
    expect(result).toBeUndefined()
  })

  // Valid case: Multiple neighbors, verify randomness works
  it('should return a neighbor from the array (randomness test)', () => {
    const neighbors = [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 1, y: 2 },
      { x: 2, y: 1 }
    ]
    
    // Run multiple times to ensure we get different results
    const results = new Set()
    for (let i = 0; i < 100; i++) {
      const result = selectRandomPosition(neighbors)
      results.add(JSON.stringify(result))
    }
    
    // Should eventually hit at least 2 different neighbors (probabilistic)
    expect(results.size).toBeGreaterThan(1)
    
    // Every result should be one of the original neighbors
    const allValid = Array.from(results).every(r => 
      neighbors.some(n => JSON.stringify(n) === r)
    )
    expect(allValid).toBe(true)
  })
})


describe('removeWallBetween', () => {
  // Helper to create a test maze with default walls = true
  const createTestMaze = (rows: number, cols: number): Maze => {
    const cells: Cell[][] = []
    for (let y = 0; y < rows; y++) {
      cells[y] = []
      for (let x = 0; x < cols; x++) {
        cells[y][x] = {
          visited: false,
          walls: { north: true, south: true, east: true, west: true }
        }
      }
    }
    return { rows, cols, cells }
  }

  // Edge case: Current cell north of next (vertical neighbor)
  it('should remove north wall of current and south wall of next when current is above next', () => {
    const maze = createTestMaze(3, 3)
    const current = { x: 1, y: 1 }
    const next = { x: 1, y: 2 } // next is south of current
    
    removeWallBetween(maze, current, next)
    
    expect(maze.cells[1][1].walls.south).toBe(false)
    expect(maze.cells[2][1].walls.north).toBe(false)
    // Other walls remain intact
    expect(maze.cells[1][1].walls.north).toBe(true)
    expect(maze.cells[1][1].walls.east).toBe(true)
    expect(maze.cells[1][1].walls.west).toBe(true)
  })

  // Edge case: Current cell south of next (vertical, reverse order)
  it('should remove north wall of next and south wall of current when current is below next', () => {
    const maze = createTestMaze(3, 3)
    const current = { x: 1, y: 2 }
    const next = { x: 1, y: 1 } // next is north of current
    
    removeWallBetween(maze, current, next)
    
    expect(maze.cells[2][1].walls.north).toBe(false)
    expect(maze.cells[1][1].walls.south).toBe(false)
  })

  // Edge case: Current cell west of next (horizontal neighbor)
  it('should remove east wall of current and west wall of next when current is left of next', () => {
    const maze = createTestMaze(3, 3)
    const current = { x: 1, y: 1 }
    const next = { x: 2, y: 1 } // next is east of current
    
    removeWallBetween(maze, current, next)
    
    expect(maze.cells[1][1].walls.east).toBe(false)
    expect(maze.cells[1][2].walls.west).toBe(false)
  })

  // Edge case: Current cell east of next (horizontal, reverse order)
  it('should remove west wall of current and east wall of next when current is right of next', () => {
    const maze = createTestMaze(3, 3)
    const current = { x: 2, y: 1 }
    const next = { x: 1, y: 1 } // next is west of current
    
    removeWallBetween(maze, current, next)
    
    expect(maze.cells[1][2].walls.west).toBe(false)
    expect(maze.cells[1][1].walls.east).toBe(false)
  })

  // Valid case: Multiple removals on same cell don't conflict
  it('should handle multiple wall removals on the same cell', () => {
    const maze = createTestMaze(3, 3)
    
    // Remove east wall
    removeWallBetween(maze, { x: 1, y: 1 }, { x: 2, y: 1 })
    // Remove south wall
    removeWallBetween(maze, { x: 1, y: 1 }, { x: 1, y: 2 })
    
    expect(maze.cells[1][1].walls.east).toBe(false)
    expect(maze.cells[1][1].walls.south).toBe(false)
    expect(maze.cells[1][1].walls.north).toBe(true)
    expect(maze.cells[1][1].walls.west).toBe(true)
  })

  // Valid case: Verify bidirectional wall removal
  it('should remove walls on both adjacent cells', () => {
    const maze = createTestMaze(3, 3)
    const current = { x: 1, y: 1 }
    const next = { x: 1, y: 2 }
    
    removeWallBetween(maze, current, next)
    
    // Current loses south wall
    expect(maze.cells[1][1].walls.south).toBe(false)
    // Next loses north wall
    expect(maze.cells[2][1].walls.north).toBe(false)
  })

  // Edge case: Border cells
  it('should work correctly for border cells', () => {
    const maze = createTestMaze(3, 3)
    const current = { x: 0, y: 0 }
    const next = { x: 1, y: 0 }
    
    removeWallBetween(maze, current, next)
    
    expect(maze.cells[0][0].walls.east).toBe(false)
    expect(maze.cells[0][1].walls.west).toBe(false)
  })
})