import { Cell, MazeData } from "../types";
import { base64UrlToBytes, bitmaskToCellWalls, unpackBytesToBitmasks } from "./packing";
import { SerializedMaze } from "./types";

export const decodeMaze = (encodedString: string): MazeData => {
    // 1. Split the header from the payload
    const { rows, cols, start, end, payload }: SerializedMaze = parseMetadata(encodedString)

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
        maze: {
            rows,
            cols,
            cells: grid
        },
        start, end


    };
}

function parseMetadata(encodedString: string): SerializedMaze {
    const parts = encodedString.split(":");

    if (parts.length !== 8 || parts[0] !== "v1") {
        throw new Error("Invalid or unsupported maze serialization format");
    }

    const [, rowsStr, colsStr, startRowStr, startColStr, endRowStr, endColStr, payloadStr] = parts;

    return {
        rows: parseInt(rowsStr, 10),
        cols: parseInt(colsStr, 10),
        start: {
            row: parseInt(startRowStr, 10),
            col: parseInt(startColStr, 10)
        },
        end: {
            row: parseInt(endRowStr, 10),
            col: parseInt(endColStr, 10)
        },
        payload: payloadStr
    };
}