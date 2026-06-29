import "jest";
import { createEmptyMaze } from "../core";
import { Maze, MazeData, Position } from "../types";
import { encodeMaze } from "./encode";
import { decodeMaze } from "./decode";

describe("Maze Serialization Roundtrip", () => {
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
    test("should seamlessly encode and decode a maze preserving custom wall configurations", () => {
        const rows = 3;
        const cols = 3;

        // Create a custom maze with specific open paths
        const originalMaze = createMazeWithWalls(rows, cols, [
            { row: 0, col: 0, walls: ["east", "south"] },
            { row: 0, col: 1, walls: ["west"] },
            { row: 1, col: 0, walls: ["north"] }
        ]);

        // Adapt the shape to fit your encoder input (rows, cols, grid/cells)
        const mazeInstance: Maze = {
            rows,
            cols,
            cells: originalMaze.cells // Using .cells from your factory function
        };
        const start: Position = { row: 0, col: 0 }
        const end: Position = { row: 1, col: 0 }

        // 1. Serialize the maze to a string
        const encodedString = encodeMaze(mazeInstance, start, end);

        // 2. Deserialize the string back into a structure
        const decodedResult: MazeData = decodeMaze(encodedString);

        // 3. Assert exact structural equality
        expect(decodedResult.maze.rows).toBe(rows);
        expect(decodedResult.maze.cols).toBe(cols);
        expect(decodedResult.maze.cells).toEqual(originalMaze.cells);
        expect(decodedResult.start).toStrictEqual(start);
        expect(decodedResult.end).toStrictEqual(end);
    });
    test("should decode a fixed legacy metadata to prevent breaking backward compatibility", () => {
        // A specific 2x2 maze encoded string you know is correct
        const hardcodedSerializedMaze = "v1:2:2:0:0:2:2:eyA"; 

        const decoded = decodeMaze(hardcodedSerializedMaze);

        // Assert against the exact expected layout
        expect(decoded.maze.rows).toBe(2);
        expect(decoded.maze.cols).toBe(2);
        expect(decoded.start).toStrictEqual({row : 0, col:0});
        expect(decoded.end).toStrictEqual({row : 2, col:2});
    });
})