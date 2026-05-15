import "jest";
import { Cell, Maze, Position } from "@/lib/maze/types";
import { getMazeStartPoint, getNeighbors, getNeighborsNotVisited, removeWallBetween, selectRandomPosition } from "./utils";

describe("getMazeStartPoint", () => {
  it("should return a point within maze bounds", () => {
    const maze: Maze = { rows: 10, cols: 10, cells: [] };

    const mockRandom = jest.spyOn(Math, "random");

    mockRandom.mockReturnValueOnce(0);
    mockRandom.mockReturnValueOnce(0);
    expect(getMazeStartPoint(maze)).toEqual({ row: 0, col: 0 });

    mockRandom.mockReturnValueOnce(0.999);
    mockRandom.mockReturnValueOnce(0.999);
    expect(getMazeStartPoint(maze)).toEqual({ row: 9, col: 9 });

    mockRandom.mockRestore();
  });

  it("should always return integer coordinates", () => {
    const maze: Maze = { rows: 5, cols: 5, cells: [] };
    const point = getMazeStartPoint(maze);

    expect(Number.isInteger(point.row)).toBe(true);
    expect(Number.isInteger(point.col)).toBe(true);
  });
  it("should return a point within maze bounds", () => {
    const maze: Maze = { rows: 10, cols: 10, cells: [] };

    for (let i = 0; i < 1000; i++) {
      const point = getMazeStartPoint(maze);
      expect(point.row).toBeGreaterThanOrEqual(0);
      expect(point.row).toBeLessThan(maze.cols);
      expect(point.col).toBeGreaterThanOrEqual(0);
      expect(point.col).toBeLessThan(maze.rows);
    }
  });
});

describe('getNeighborsNotVisited', () => {
  // Helper to create a test maze with custom visited states
const createTestMaze = (rows: number, cols: number, visitedCells: string[] = []): Maze => {
  const cells: Cell[][] = []
  for (let x = 0; x < rows; x++) {      // x = row
    cells[x] = []
    for (let y = 0; y < cols; y++) {    // y = col
      cells[x][y] = {
        visited: visitedCells.includes(`${x},${y}`),
        walls: { north: true, south: true, east: true, west: true }
      }
    }
  }
  return { rows, cols, cells }
}

// Test: top-left corner (row 0, col 0)
it('should return only valid neighbors from top-left corner', () => {
  const maze = createTestMaze(3, 3, [])
  const neighbors = getNeighborsNotVisited(maze, {row:0, col:0})
  
  expect(neighbors).toHaveLength(2)
  expect(neighbors).toContainEqual({ row: 0, col: 1 }) // east (same row, col+1)
  expect(neighbors).toContainEqual({ row: 1, col: 0 }) // south (row+1, same col)
})

// Test: top-right corner (row 0, col 2)
it('should return only valid neighbors from top-right corner', () => {
  const maze = createTestMaze(3, 3, [])
  const neighbors = getNeighborsNotVisited(maze,{row:0, col:2})
  
  expect(neighbors).toHaveLength(2)
  expect(neighbors).toContainEqual({ row: 0, col: 1 }) // west
  expect(neighbors).toContainEqual({ row: 1, col: 2 }) // south
})

// Test: center cell (row 1, col 1)
it('should return all 4 neighbors from center cell', () => {
  const maze = createTestMaze(3, 3, [])
  const neighbors = getNeighborsNotVisited(maze, { row: 1, col: 1 }) 
  
  expect(neighbors).toHaveLength(4)
  expect(neighbors).toContainEqual({ row: 0, col: 1 }) // north
  expect(neighbors).toContainEqual({ row: 1, col: 2 }) // east
  expect(neighbors).toContainEqual({ row: 2, col: 1 }) // south
  expect(neighbors).toContainEqual({ row: 1, col: 0 }) // west
})
})

describe('selectRandomPosition', () => {
  // Edge case: Single neighbor
  it('should return the only neighbor when array has one element', () => {
    const neighbors = [{ row: 1, col: 2 }]
    const result = selectRandomPosition(neighbors)
    
    expect(result).toEqual({ row: 1, col: 2 })
  })

  // Edge case: Empty array (should never happen in practice, but test behavior)
  it('should return undefined when array is empty', () => {
    const neighbors: Position[] = []
    const result = selectRandomPosition(neighbors)
    
    // Math.floor(Math.random() * 0) = NaN, array[NaN] = undefined
    expect(result).toBeUndefined()
  })

  // Valid case: Multiple neighbors, verify randomness works
  it('should return a neighbor from the array (randomness test)', () => {
    const neighbors = [
      { row: 0, col: 1 },
      { row: 1, col: 0 },
      { row: 1, col: 2 },
      { row: 2, col: 1 }
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
    const current = { row: 1, col: 1 }
    const next = { row: 1, col: 2 } // next is south of current
    
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
    const current = { row: 1, col: 2 }
    const next = { row: 1, col: 1 } // next is north of current
    
    removeWallBetween(maze, current, next)
    
    expect(maze.cells[2][1].walls.north).toBe(false)
    expect(maze.cells[1][1].walls.south).toBe(false)
  })

  // Edge case: Current cell west of next (horizontal neighbor)
  it('should remove east wall of current and west wall of next when current is left of next', () => {
    const maze = createTestMaze(3, 3)
    const current = { row: 1, col: 1 }
    const next = { row: 2, col: 1 } // next is east of current
    
    removeWallBetween(maze, current, next)
    
    expect(maze.cells[1][1].walls.east).toBe(false)
    expect(maze.cells[1][2].walls.west).toBe(false)
  })

  // Edge case: Current cell east of next (horizontal, reverse order)
  it('should remove west wall of current and east wall of next when current is right of next', () => {
    const maze = createTestMaze(3, 3)
    const current = { row: 2, col: 1 }
    const next = { row: 1, col: 1 } // next is west of current
    
    removeWallBetween(maze, current, next)
    
    expect(maze.cells[1][2].walls.west).toBe(false)
    expect(maze.cells[1][1].walls.east).toBe(false)
  })

  // Valid case: Multiple removals on same cell don't conflict
  it('should handle multiple wall removals on the same cell', () => {
    const maze = createTestMaze(3, 3)
    
    // Remove east wall
    removeWallBetween(maze, { row: 1, col: 1 }, { row: 2, col: 1 })
    // Remove south wall
    removeWallBetween(maze, { row: 1, col: 1 }, { row: 1, col: 2 })
    
    expect(maze.cells[1][1].walls.east).toBe(false)
    expect(maze.cells[1][1].walls.south).toBe(false)
    expect(maze.cells[1][1].walls.north).toBe(true)
    expect(maze.cells[1][1].walls.west).toBe(true)
  })

  // Valid case: Verify bidirectional wall removal
  it('should remove walls on both adjacent cells', () => {
    const maze = createTestMaze(3, 3)
    const current = { row: 1, col: 1 }
    const next = { row: 1, col: 2 }
    
    removeWallBetween(maze, current, next)
    
    // Current loses south wall
    expect(maze.cells[1][1].walls.south).toBe(false)
    // Next loses north wall
    expect(maze.cells[2][1].walls.north).toBe(false)
  })

  // Edge case: Border cells
  it('should work correctly for border cells', () => {
    const maze = createTestMaze(3, 3)
    const current = { row: 0, col: 0 }
    const next = { row: 1, col: 0 }
    
    removeWallBetween(maze, current, next)
    
    expect(maze.cells[0][0].walls.east).toBe(false)
    expect(maze.cells[0][1].walls.west).toBe(false)
  })
})



describe('getNeighbors', () => {
  // Helper to create a maze of given size
  const createMaze = (rows: number, cols: number): Maze => ({
    rows,
    cols,
    cells: Array(rows).fill(null).map(() => Array(cols).fill({ visited: false, walls: {} }))
  })

  it('should return 2 neighbors for top-left corner in 3x3', () => {
    const maze = createMaze(3, 3)
    const neighbors = getNeighbors(maze, {row:0, col:0})
    
    expect(neighbors).toHaveLength(2)
    expect(neighbors).toContainEqual({ row: 1, col: 0 }) // east
    expect(neighbors).toContainEqual({ row: 0, col: 1 }) // south
  })

  it('should return 4 neighbors for center cell in 3x3', () => {
    const maze = createMaze(3, 3)
    const neighbors = getNeighbors(maze, {row:1, col:1})
    
    expect(neighbors).toHaveLength(4)
    expect(neighbors).toContainEqual({ row: 1, col: 0 }) // north
    expect(neighbors).toContainEqual({ row: 2, col: 1 }) // east
    expect(neighbors).toContainEqual({ row: 1, col: 2 }) // south
    expect(neighbors).toContainEqual({ row: 0, col: 1 }) // west
  })

  it('should return 3 neighbors for top edge cell (not corner) in 3x3', () => {
    const maze = createMaze(3, 3)
    const neighbors = getNeighbors(maze, {row:1, col:0})
    
    expect(neighbors).toHaveLength(3)
    expect(neighbors).toContainEqual({ row: 2, col: 0 }) // east
    expect(neighbors).toContainEqual({ row: 1, col: 1 }) // south
    expect(neighbors).toContainEqual({ row: 0, col: 0 }) // west
  })

  it('should return empty array for invalid coordinates', () => {
    const maze = createMaze(3, 3)
    const neighbors = getNeighbors(maze, {row:-1,col: 5})
    
    expect(neighbors).toHaveLength(0)
  })
})