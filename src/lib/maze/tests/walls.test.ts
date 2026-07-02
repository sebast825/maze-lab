import { Maze, Cell, Position } from "@/lib/maze/types";
import "jest";
import { hasWallWithNeighbor, setWallBetween } from "../walls";
import { createEmptyMaze } from "../core";

describe("hasWallWithNeighbor", () => {
  const createMaze = (rows: number, cols: number): Maze => {
    const cells: Cell[][] = [];
    for (let row = 0; row < rows; row++) {
      cells[row] = [];
      for (let col = 0; col < cols; col++) {
        cells[row][col] = {
          visited: false,
          walls: { north: true, south: true, east: true, west: true },
        };
      }
    }
    return { rows, cols, cells };
  };

  describe("with walls closed (default)", () => {
    it.each([
      {
        current: { row: 0, col: 0 },
        neighbor: { row: 1, col: 0 },
        msg: "south",
      },
      {
        current: { row: 1, col: 0 },
        neighbor: { row: 0, col: 0 },
        msg: "north",
      },
      {
        current: { row: 0, col: 0 },
        neighbor: { row: 0, col: 1 },
        msg: "east",
      },
      {
        current: { row: 0, col: 1 },
        neighbor: { row: 0, col: 0 },
        msg: "west",
      },
    ])("should return true for $msg neighbor", ({ current, neighbor }) => {
      const maze = createMaze(3, 3);
      expect(hasWallWithNeighbor(maze, current, neighbor)).toBe(true);
    });
  });

  describe("with walls open", () => {
    it.each([
      {
        current: { row: 0, col: 0 },
        neighbor: { row: 1, col: 0 },
        openCurrent: { wall: "south" as const },
        openNeighbor: { wall: "north" as const },
      },
      {
        current: { row: 1, col: 0 },
        neighbor: { row: 0, col: 0 },
        openCurrent: { wall: "north" as const },
        openNeighbor: { wall: "south" as const },
      },
      {
        current: { row: 0, col: 0 },
        neighbor: { row: 0, col: 1 },
        openCurrent: { wall: "east" as const },
        openNeighbor: { wall: "west" as const },
      },
      {
        current: { row: 0, col: 1 },
        neighbor: { row: 0, col: 0 },
        openCurrent: { wall: "west" as const },
        openNeighbor: { wall: "east" as const },
      },
    ])(
      "should return false when walls are open",
      ({ current, neighbor, openCurrent, openNeighbor }) => {
        const maze = createMaze(3, 3);
        maze.cells[current.row][current.col].walls[openCurrent.wall] = false;
        maze.cells[neighbor.row][neighbor.col].walls[openNeighbor.wall] = false;
        debugger
        const test = hasWallWithNeighbor(maze, current, neighbor)
        expect(test).toBe(false);
      },
    );
  });

  it("should return false for non-adjacent cells", () => {
    const maze = createMaze(3, 3);
    const current = { row: 0, col: 0 };
    const neighbor = { row: 2, col: 2 };
    expect(hasWallWithNeighbor(maze, current, neighbor)).toBe(false);
  });
});




describe("setWallBetween", () => {
  const expectWall = (
    maze: Maze,
    pos: Position,
    wall: "north" | "east" | "south" | "west",
    expected: boolean,
  ) => {
    expect(maze.cells[pos.row][pos.col].walls[wall]).toBe(expected);
  };

  describe("horizontal movement (same row)", () => {
    it("should remove east/west walls when current is west of next", () => {
      const maze = createEmptyMaze(3, 3);
      const current = { row: 1, col: 1 };
      const next = { row: 1, col: 2 };
      setWallBetween(maze, current, next);
      expectWall(maze, current, "east", false);
      expectWall(maze, next, "west", false);
    });

    it("should remove west/east walls when current is east of next", () => {
      const maze = createEmptyMaze(3, 3);
      const current = { row: 1, col: 2 };
      const next = { row: 1, col: 1 };
      setWallBetween(maze, current, next);
      expectWall(maze, current, "west", false);
      expectWall(maze, next, "east", false);
    });
  });

  describe("vertical movement (same column)", () => {
    it("should remove south/north walls when current is north of next", () => {
      const maze = createEmptyMaze(3, 3);
      const current = { row: 1, col: 1 };
      const next = { row: 2, col: 1 };
      setWallBetween(maze, current, next);
      expectWall(maze, current, "south", false);
      expectWall(maze, next, "north", false);
    });

    it("should remove north/south walls when current is south of next", () => {
      const maze = createEmptyMaze(3, 3);
      const current = { row: 2, col: 1 };
      const next = { row: 1, col: 1 };
      setWallBetween(maze, current, next);
      expectWall(maze, current, "north", false);
      expectWall(maze, next, "south", false);
    });
  });

  describe("edge cases", () => {
    it("should work on border cells", () => {
      const maze = createEmptyMaze(3, 3);
      setWallBetween(maze, { row: 0, col: 0 }, { row: 1, col: 0 });
      expectWall(maze, { row: 0, col: 0 }, "south", false);
      expectWall(maze, { row: 1, col: 0 }, "north", false);
    });

    it("should work on different grid sizes (2x2, 5x5, 4x6)", () => {
      const maze2x2 = createEmptyMaze(2, 2);
      setWallBetween(maze2x2, { row: 0, col: 0 }, { row: 0, col: 1 });
      expectWall(maze2x2, { row: 0, col: 0 }, "east", false);

      const maze5x5 = createEmptyMaze(5, 5);
      setWallBetween(maze5x5, { row: 4, col: 4 }, { row: 4, col: 3 });
      expectWall(maze5x5, { row: 4, col: 4 }, "west", false);

      const maze4x6 = createEmptyMaze(4, 6);
      setWallBetween(maze4x6, { row: 2, col: 3 }, { row: 3, col: 3 });
      expectWall(maze4x6, { row: 2, col: 3 }, "south", false);
    });

    it("should handle multiple removals on the same cell", () => {
      const maze = createEmptyMaze(3, 3);
      const center = { row: 1, col: 1 };
      setWallBetween(maze, center, { row: 1, col: 2 });
      setWallBetween(maze, center, { row: 2, col: 1 });
      expectWall(maze, center, "east", false);
      expectWall(maze, center, "south", false);
      expectWall(maze, center, "north", true);
      expectWall(maze, center, "west", true);
    });
  });

  describe("invalid cases", () => {
    it("should not modify non-adjacent cells", () => {
      const maze = createEmptyMaze(3, 3);
      const before = JSON.stringify(maze.cells);
      setWallBetween(maze, { row: 0, col: 0 }, { row: 2, col: 2 });
      expect(JSON.stringify(maze.cells)).toBe(before);
    });
  });
});
