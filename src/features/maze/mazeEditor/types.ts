import { Position } from "@/lib/maze/types";

export type AddWallAction = {
    type: "ADD_WALL";
    cellA: Position;
    cellB: Position;
};

export type RemoveWallAction = {
    type: "REMOVE_WALL";
    cellA: Position;
    cellB: Position;
};

export type MazeAction =
    | AddWallAction
    | RemoveWallAction;