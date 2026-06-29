import { Maze, Position } from "../types";
import { bytesToBase64Url, cellWallsToBitmask, packBitmasksIntoBytes } from "./packing";
import { MetadataString } from "./types";


export const encodeMaze = (maze: Maze, start: Position, end: Position): string => {
    const wallBitmask: number[] = maze.cells.flatMap(cells => cells.map(cell => cellWallsToBitmask(cell)))
    const wallBitmaskBytes: Uint8Array = packBitmasksIntoBytes(wallBitmask)
    const payload = bytesToBase64Url(wallBitmaskBytes);
    const metadata: MetadataString = `v1:${maze.rows}:${maze.cols}:${start.row}:${start.col}:${end.row}:${end.col}`
    return `${metadata}:${payload}`;
}
