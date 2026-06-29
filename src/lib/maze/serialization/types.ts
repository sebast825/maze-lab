import { Position } from "../types";

export type MetadataString = `v1:${number}:${number}:${number}:${number}:${number}:${number}`;
export interface SerializedMaze {
    rows: number;
    cols: number;
    start: Position;
    end: Position;
    payload: string;
}