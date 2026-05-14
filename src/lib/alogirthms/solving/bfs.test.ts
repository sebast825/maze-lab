import { Maze, Cell } from "@/lib/maze/types";
import { bfs } from "./bfs";

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
    const start = { x: 0, y: 0 };
    const result = bfs(maze, start);

    expect(result.farthest.x).toBe(0);
    expect(result.farthest.y).toBe(0);
    expect(result.farthest.distance).toBe(0);
  });

  it("should find farthest cell correctly in 2x2 grid", () => {
    const maze = createConnectedMaze(2, 2);
    const start = { x: 0, y: 0 };
    const result = bfs(maze, start);

    expect(result.farthest.x).toBe(1);
    expect(result.farthest.y).toBe(1);
    expect(result.farthest.distance).toBe(2);
  });

  it("should correctly map parent relationships", () => {
    const maze = createConnectedMaze(2, 2);
    const start = { x: 0, y: 0 };
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

    const result = bfs(maze, { x: 0, y: 0 });

    expect(result.cellInfo[0][1]).toEqual({
      distance: -1,
      parent: null,
    });

    expect(result.farthest.distance).toBe(0);
  });

  it("should visit all reachable cells", () => {
    const maze = createConnectedMaze(3, 3);
    const start = { x: 1, y: 1 };
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
