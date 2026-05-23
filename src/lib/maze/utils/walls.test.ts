import { Maze, Cell } from "@/lib/maze/types";
import "jest";
import { hasWallWithNeighbor } from "./walls";

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
