import { Position } from "@/lib/maze/types";
import { Maze } from "@/lib/maze/types";
import { hasWallWithNeighbor, setWallBetween } from "@/lib/maze/walls";
import { MazeAction } from "./types";



export function createWallAction(
    maze: Maze,
    cellA: Position,
    cellB: Position,
): MazeAction {
    const hasWall = hasWallWithNeighbor(
        maze,
        cellA,
        cellB,
    );

    if (hasWall) {
        return {
            type: "REMOVE_WALL",
            cellA,
            cellB,
        };
    }

    return {
        type: "ADD_WALL",
        cellA,
        cellB,
    };
}

export function applyMazeAction(
    maze: Maze,
    action: MazeAction,
): Maze {
    const newMaze = structuredClone(maze);

    switch (action.type) {
        case "ADD_WALL":
            setWallBetween(newMaze, action.cellA, action.cellB, true);
            return newMaze;

        case "REMOVE_WALL":
            setWallBetween(newMaze, action.cellA, action.cellB, false);
            return newMaze;


        default:
            throw new Error(`Unsupported action`);
    }
}