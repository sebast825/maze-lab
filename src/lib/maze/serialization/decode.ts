import { Cell, Maze } from "../types";
import { base64UrlToBytes, bitmaskToCellWalls, unpackBytesToBitmasks } from "./packing";

export const bitmaskToMaze = (encodedString: string): Maze => {
    // 1. Split the header from the payload
    const parts = encodedString.split(":");

    if (parts.length !== 4 || parts[0] !== "v1") {
        throw new Error("Invalid or unsupported maze serialization format");
    }

    const rows = parseInt(parts[1], 10);
    const cols = parseInt(parts[2], 10);
    const payload = parts[3];

    const totalCells = rows * cols;
    // 2. Convert Base64URL string back to raw bytes
    const bytes = base64UrlToBytes(payload);
    // 3. Unpack those bytes into individual cell bitmasks
    const bitmasks = unpackBytesToBitmasks(bytes, totalCells)

    // 4. Reconstruct the 2D grid of Cells
    const grid: Cell[][] = [];
    let bitmaskIndex = 0;

    for (let r = 0; r < rows; r++) {
        const row: Cell[] = [];
        for (let c = 0; c < cols; c++) {
            const bitmask = bitmasks[bitmaskIndex++];
            row.push(bitmaskToCellWalls(bitmask));
        }
        grid.push(row);
    }
    return {
        rows,
        cols,
        cells: grid

    };
}