import { Cell, MazeData } from "../types";
import { base64UrlToBytes, bitmaskToCellWalls, unpackBytesToBitmasks } from "./packing";
import { SerializedMaze } from "./types";

export const decodeMaze = (encodedString: string): MazeData => {
    const { rows, cols, start, end, payload } =
        parseMetadata(encodedString);

    if (!Number.isInteger(rows) || rows <= 0) {
        throw new Error("Invalid maze rows");
    }

    if (!Number.isInteger(cols) || cols <= 0) {
        throw new Error("Invalid maze cols");
    }

    if (!payload) {
        throw new Error("Missing maze payload");
    }

    const totalCells = rows * cols;

    const bytes = base64UrlToBytes(payload);

    if (bytes.length === 0) {
        throw new Error("Empty maze payload");
    }

    const expectedBytes = Math.ceil(totalCells / 2);

    if (bytes.length !== expectedBytes) {
        throw new Error(
            `Invalid payload length. Expected ${expectedBytes} bytes, got ${bytes.length}`,
        );
    }

    const bitmasks = unpackBytesToBitmasks(bytes, totalCells);

    if (bitmasks.length !== totalCells) {
        throw new Error(
            `Invalid cell count. Expected ${totalCells}, got ${bitmasks.length}`,
        );
    }

    const grid: Cell[][] = [];
    let bitmaskIndex = 0;

    for (let r = 0; r < rows; r++) {
        const row: Cell[] = [];

        for (let c = 0; c < cols; c++) {
            const bitmask = bitmasks[bitmaskIndex++];

            if (bitmask < 0 || bitmask > 15) {
                throw new Error(`Invalid cell bitmask: ${bitmask}`);
            }

            row.push(bitmaskToCellWalls(bitmask));
        }

        grid.push(row);
    }

    return {
        maze: {
            rows,
            cols,
            cells: grid,
        },
        start,
        end,
    };
};

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