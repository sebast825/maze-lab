import { Maze } from "../types";
import { bytesToBase64Url, cellWallsToBitmask, packBitmasksIntoBytes } from "./packing";

export const mazeToBitmask = (maze: Maze): string => {
    const wallBitmask: number[] = maze.cells.flatMap(cells => cells.map(cell => cellWallsToBitmask(cell)))
    const wallBitmaskBytes: Uint8Array = packBitmasksIntoBytes(wallBitmask)
    const payload = bytesToBase64Url(wallBitmaskBytes);
    const headers = `v1:${maze.rows}:${maze.cols}`
    return `${headers}:${payload}`;
}
