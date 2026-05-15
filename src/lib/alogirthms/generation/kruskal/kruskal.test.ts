import { Maze } from "@/lib/maze/types";
import { find, getWallsWithNeighbor, union } from "./utils";

describe("find", () => {
  it("should return same id when id is root", () => {
    const parent = [0, 1, 2, 3]
    expect(find(parent, 1)).toBe(1)
    expect(find(parent, 0)).toBe(0)
  })

  it("should find root parent when chain exists", () => {
    const parent = [0, 0, 1, 2]
    expect(find(parent, 3)).toBe(0)
  })

  it("should compress path to root after find", () => {
    const parent = [0, 0, 1, 2]
    find(parent, 3)
    expect(parent[3]).toBe(0)
  })

  it("should find root for all ids after multiple unions", () => {
    const parent = [0, 0, 1, 2]
    const ids = [3, 2, 1, 0]
    const results = ids.map(id => find(parent, id))
    expect(results).toEqual([0, 0, 0, 0])
  })

  it("should compress path correctly for non-linear chain", () => {
    const parent = [0, 0, 2, 2]
    expect(find(parent, 3)).toBe(2)
    expect(parent[3]).toBe(2)
    expect(find(parent, 1)).toBe(0)
  })
})

describe("union", () => {
  it("should return true when roots are different", () => {
    const parent = Array(10).fill(0).map((_, i) => i)
    const result = union(parent, 1, 3)
    expect(result).toBe(true)
  })

  it("should return false when roots are already the same", () => {
    const parent = Array(10).fill(0).map((_, i) => i)
    parent[3] = 1
    const result = union(parent, 1, 3)
    expect(result).toBe(false)
    expect(parent[3]).toBe(1);
  })
})


describe('getWallsWithNeighbor', () => {
  it('should return correct number of walls for 1x1 maze', () => {
    const maze: Maze = { rows: 1, cols: 1, cells: [] }
    const walls = getWallsWithNeighbor(maze)
    expect(walls).toHaveLength(0)
  })

  it('should return correct number of walls for 1x2 maze', () => {
    const maze: Maze = { rows: 1, cols: 2, cells: [] }
    const walls = getWallsWithNeighbor(maze)
    // 1 row, 2 cols: solo pared horizontal entre (0,0) y (0,1)
    expect(walls).toHaveLength(1)
    expect(walls[0]).toEqual({
      cell1: { x: 0, y: 0 },
      cell2: { x: 0, y: 1 }
    })
  })

  it('should return correct number of walls for 2x1 maze', () => {
    const maze: Maze = { rows: 2, cols: 1, cells: [] }
    const walls = getWallsWithNeighbor(maze)
    // 2 rows, 1 col: solo pared vertical entre (0,0) y (1,0)
    expect(walls).toHaveLength(1)
    expect(walls[0]).toEqual({
      cell1: { x: 0, y: 0 },
      cell2: { x: 1, y: 0 }
    })
  })

  it('should return correct number of walls for 2x2 maze', () => {
    const maze: Maze = { rows: 2, cols: 2, cells: [] }
    const walls = getWallsWithNeighbor(maze)
    // Paredes horizontales: 2 (fila 0, fila 1)
    // Paredes verticales: 2 (col 0, col 1)
    expect(walls).toHaveLength(4)
  })

  it('should not return duplicate walls (each wall once)', () => {
    const maze: Maze = { rows: 2, cols: 2, cells: [] }
    const walls = getWallsWithNeighbor(maze)
    
    // Verificar que cada pared aparece una sola vez
    const keySet = new Set()
    for (const wall of walls) {
      const key1 = `${wall.cell1.x},${wall.cell1.y}-${wall.cell2.x},${wall.cell2.y}`
      const key2 = `${wall.cell2.x},${wall.cell2.y}-${wall.cell1.x},${wall.cell1.y}`
      expect(keySet.has(key1) || keySet.has(key2)).toBe(false)
      keySet.add(key1)
    }
  })
})