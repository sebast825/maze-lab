import { Maze, Cell } from "@/lib/maze/types";
import { bfs, } from "./bfs";
import { createEmptyMaze } from "@/lib/maze/core";
import { getNeighborsByOpenWall } from "@/lib/maze/walls";

describe("bfs", () => {
  const createConnectedMaze = (rows: number, cols: number): Maze => {
    const cells: Cell[][] = [];
    for (let y = 0; y < rows; y++) {
      cells[y] = [];
      for (let x = 0; x < cols; x++) {
        cells[y][x] = {
          visited: false,
          walls: { north: false, south: false, east: false, west: false },
        };
      }
    }
    return { rows, cols, cells };
  };

  it("should return start as farthest when maze has only one cell", () => {
    const maze = createConnectedMaze(1, 1);
    const start = { row: 0, col: 0 };
    const result = bfs(maze, start);

    expect(result.farthest.row).toBe(0);
    expect(result.farthest.col).toBe(0);
    expect(result.farthest.distance).toBe(0);
  });

  it("should find farthest cell correctly in 2x2 grid", () => {
    const maze = createConnectedMaze(2, 2);
    const start = { row: 0, col: 0 };
    const result = bfs(maze, start);

    expect(result.farthest.row).toBe(1);
    expect(result.farthest.col).toBe(1);
    expect(result.farthest.distance).toBe(2);
  });

  it("should correctly map parent relationships", () => {
    const maze = createConnectedMaze(2, 2);
    const start = { row: 0, col: 0 };
    const result = bfs(maze, start);

    const parentOfEnd = result.cellInfo[1][1];
    expect(parentOfEnd).not.toBeNull();
  });

  it("should not traverse blocked walls", () => {
    //the wall to the east is closed, so can't go there
    const maze: Maze = {
      rows: 1,
      cols: 2,
      cells: [
        [
          {
            visited: false,
            walls: { north: true, east: true, south: true, west: true },
          },
          {
            visited: false,
            walls: { north: true, east: true, south: true, west: true },
          },
        ],
      ],
    };

    const result = bfs(maze, { row: 0, col: 0 });

    expect(result.cellInfo[0][1]).toEqual({
      distance: -1,
      parent: null,
    });

    expect(result.farthest.distance).toBe(0);
  });

  it("should visit all reachable cells", () => {
    const maze = createConnectedMaze(3, 3);
    const start = { row: 1, col: 1 };
    const result = bfs(maze, start);

    let visitedCount = 0;
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (
          result.cellInfo[x]?.[y] !== null &&
          result.cellInfo[x]?.[y] !== undefined
        )
          visitedCount++;
      }
    }
    expect(visitedCount).toBe(9);
  });
});

describe("getNeighborsByOpenWall", () => {
  const createMazeWithWalls = (
    rows: number,
    cols: number,
    openWalls: { row: number; col: number; walls: string[] }[],
  ): Maze => {
    const maze = createEmptyMaze(rows, cols);
    for (const { row, col, walls } of openWalls) {
      for (const wall of walls) {
        maze.cells[row][col].walls[
          wall as keyof (typeof maze.cells)[0][0]["walls"]
        ] = false;
      }
    }
    return maze;
  };

  it("should return no neighbors for isolated cell with all walls closed", () => {
    const maze = createEmptyMaze(3, 3);
    const neighbors = getNeighborsByOpenWall(maze, { row: 1, col: 1 });
    expect(neighbors).toHaveLength(0);
  });
  //this is hipotetic, never should be a neighbor open while the main cell is closed. somthing happen before is this appear
  it("should return no neighbors for isolated cell with all walls closed and neighbors open walls", () => {
    const maze = createEmptyMaze(3, 3);
    maze.cells[0][1].walls.south = false;
    maze.cells[2][1].walls.north = false;
    maze.cells[1][2].walls.west = false;
    maze.cells[1][0].walls.east = false;
    const neighbors = getNeighborsByOpenWall(maze, { row: 1, col: 1 });
    expect(neighbors).toHaveLength(0);
  });

  it("should return north neighbor when north wall is open", () => {
    const maze = createMazeWithWalls(3, 3, [
      { row: 1, col: 1, walls: ["north"] },
    ]);
    maze.cells[0][1].walls.south = false;

    const neighbors = getNeighborsByOpenWall(maze, { row: 1, col: 1 });

    expect(neighbors).toContainEqual({ row: 0, col: 1 });
    expect(neighbors).toHaveLength(1);
  });

  it("should return south neighbor when south wall is open", () => {
    const maze = createMazeWithWalls(3, 3, [
      { row: 1, col: 1, walls: ["south"] },
    ]);
    maze.cells[2][1].walls.north = false;

    const neighbors = getNeighborsByOpenWall(maze, { row: 1, col: 1 });
    expect(neighbors).toContainEqual({ row: 2, col: 1 });
    expect(neighbors).toHaveLength(1);
  });

  it("should return east neighbor when east wall is open", () => {
    const maze = createMazeWithWalls(3, 3, [
      { row: 1, col: 1, walls: ["east"] },
    ]);
    maze.cells[1][2].walls.west = false;

    const neighbors = getNeighborsByOpenWall(maze, { row: 1, col: 1 });
    expect(neighbors).toContainEqual({ row: 1, col: 2 });
    expect(neighbors).toHaveLength(1);
  });

  it("should return west neighbor when west wall is open", () => {
    const maze = createMazeWithWalls(3, 3, [
      { row: 1, col: 1, walls: ["west"] },
    ]);
    maze.cells[1][0].walls.east = false;

    const neighbors = getNeighborsByOpenWall(maze, { row: 1, col: 1 });
    expect(neighbors).toContainEqual({ row: 1, col: 0 });
    expect(neighbors).toHaveLength(1);
  });

  it("should return all 4 neighbors when all walls are open", () => {
    const maze = createMazeWithWalls(3, 3, [
      { row: 1, col: 1, walls: ["north", "south", "east", "west"] },
    ]);
    maze.cells[0][1].walls.south = false;
    maze.cells[2][1].walls.north = false;
    maze.cells[1][2].walls.west = false;
    maze.cells[1][0].walls.east = false;
    const neighbors = getNeighborsByOpenWall(maze, { row: 1, col: 1 });

    expect(neighbors).toHaveLength(4);
    expect(neighbors).toContainEqual({ row: 0, col: 1 });
    expect(neighbors).toContainEqual({ row: 2, col: 1 });
    expect(neighbors).toContainEqual({ row: 1, col: 2 });
    expect(neighbors).toContainEqual({ row: 1, col: 0 });
  });

  describe("edge cases (border cells)", () => {
    it("should not return north neighbor at top row even if north wall is open", () => {
      const maze = createMazeWithWalls(3, 3, [
        { row: 0, col: 1, walls: ["north"] },
      ]);
      const neighbors = getNeighborsByOpenWall(maze, { row: 0, col: 1 });
      expect(neighbors).not.toContainEqual({ row: -1, col: 1 });
      expect(neighbors).toHaveLength(0);
    });

    it("should not return south neighbor at bottom row even if south wall is open", () => {
      const maze = createMazeWithWalls(3, 3, [
        { row: 2, col: 1, walls: ["south"] },
      ]);
      const neighbors = getNeighborsByOpenWall(maze, { row: 2, col: 1 });
      expect(neighbors).not.toContainEqual({ row: 3, col: 1 });
      expect(neighbors).toHaveLength(0);
    });

    it("should not return east neighbor at rightmost column even if east wall is open", () => {
      const maze = createMazeWithWalls(3, 3, [
        { row: 1, col: 2, walls: ["east"] },
      ]);
      const neighbors = getNeighborsByOpenWall(maze, { row: 1, col: 2 });
      expect(neighbors).not.toContainEqual({ row: 1, col: 3 });
      expect(neighbors).toHaveLength(0);
    });

    it("should not return west neighbor at leftmost column even if west wall is open", () => {
      const maze = createMazeWithWalls(3, 3, [
        { row: 1, col: 0, walls: ["west"] },
      ]);
      const neighbors = getNeighborsByOpenWall(maze, { row: 1, col: 0 });
      expect(neighbors).not.toContainEqual({ row: 1, col: -1 });
      expect(neighbors).toHaveLength(0);
    });
  });

  describe("rectangular grids (rows != cols)", () => {
    it("should work correctly on 5x3 grid", () => {
      const maze = createEmptyMaze(5, 3);
      // Abrir todas las paredes de la celda central (2,1)
      maze.cells[2][1].walls = {
        north: false,
        south: false,
        east: false,
        west: false,
      };
      maze.cells[1][1].walls.south = false;
      maze.cells[3][1].walls.north = false;
      maze.cells[2][2].walls.west = false;
      maze.cells[2][0].walls.east = false;

      const neighbors = getNeighborsByOpenWall(maze, { row: 2, col: 1 });

      expect(neighbors).toHaveLength(4);
      expect(neighbors).toContainEqual({ row: 1, col: 1 });
      expect(neighbors).toContainEqual({ row: 3, col: 1 });
      expect(neighbors).toContainEqual({ row: 2, col: 2 });
      expect(neighbors).toContainEqual({ row: 2, col: 0 });
    });

    it("should respect column bounds when cols < rows", () => {
      const maze = createEmptyMaze(5, 3);
      // Celda en (2,2) última columna
      maze.cells[2][2].walls = {
        north: false,
        south: false,
        east: false,
        west: false,
      };

      const neighbors = getNeighborsByOpenWall(maze, { row: 2, col: 2 });

      // east debería estar fuera de bounds (col 3 no existe)
      expect(neighbors).not.toContainEqual({ row: 2, col: 3 });
      expect(neighbors.length).toBeLessThan(4);
    });
  });
});
