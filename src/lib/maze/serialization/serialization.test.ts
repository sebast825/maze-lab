import "jest";
import { createEmptyMaze } from "../core";
import { Maze } from "../types";
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

        // 1. Serialize the maze to a string
        const encodedString = encodeMaze(mazeInstance);

        // 2. Deserialize the string back into a structure
        const decodedResult = decodeMaze(encodedString);

        // 3. Assert exact structural equality
        expect(decodedResult.rows).toBe(rows);
        expect(decodedResult.cols).toBe(cols);
        expect(decodedResult.cells).toEqual(originalMaze.cells);
    });
    test("should decode a fixed legacy string to prevent breaking backward compatibility", () => {
    // A specific 2x2 maze encoded string you know is correct
    const hardcodedSerializedMaze = "v1:2:2:eyA"; // Example string, replace with a real one you generate once
    
    const decoded = decodeMaze(hardcodedSerializedMaze);
    
    // Assert against the exact expected layout
    expect(decoded.rows).toBe(2);
    expect(decoded.cols).toBe(2);
    expect(decoded.cells[0][0].walls.north).toBe(true); // Adjust to match your real output
});
})