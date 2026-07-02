import { findAllPaths } from "@/lib/algorithms/solving/dfs";
import { decodeMaze } from "@/lib/maze/serialization/decode";
import { MazeData, Position } from "@/lib/maze/types";
import { useEffect, useState } from "react";
import { useMazeMetrics } from "../hooks/useMazeMetrics";
import { applyMazeAction, createWallAction } from "./helpers";
import { areNeighbors, isCellInBounds } from "@/lib/maze/core";

type UseMazeEditorParams = {
    encodedData: string;
};

export function useMazeEditor({
    encodedData,
}: UseMazeEditorParams) {
    const [mazeData, setMazeData] = useState<MazeData | null>();
    const [error, setError] = useState<string | null>(null);
    const { metrics, calculateMetrics } = useMazeMetrics();

    useEffect(() => {
        try {

            const decodedMaze = decodeMaze(encodedData);
            const solution = findAllPaths(
                decodedMaze.maze,
                decodedMaze.start,
                decodedMaze.end,
            );

            decodedMaze.solution = solution;
            calculateMetrics(decodedMaze);

            setMazeData(decodedMaze);
        } catch (error) {
            console.error("Failed to load maze:", error);
            setError("Failed to load maze");
        }
    }, [encodedData]);

    const handleWallClick = (
        cellA: Position,
        cellB: Position,
    ) => {
        if (!mazeData) return
        // 1. Validate input
        if (!areNeighbors(cellA, cellB)) {
            return;
        }
        if (!isCellInBounds(mazeData.maze, cellA)) {
            return;
        }

        if (!isCellInBounds(mazeData.maze, cellB)) {
            return;
        }

        // 2. Determine intended action
        const action = createWallAction(
            mazeData.maze,
            cellA,
            cellB,
        );
        console.log(action)
        // 3. (Future) Store action for undo/redo
        // history.push(action);

        // 4. Apply action to maze
        const updatedMaze = applyMazeAction(
            mazeData.maze,
            action,
        );


        setMazeData({ ...mazeData, maze: updatedMaze })
        // 5. Recompute derived state
        /*     const pathMaps = recomputePathMaps(
                 updatedMaze,
             );
     
             const metrics = recomputeMetrics(
                 updatedMaze,
                 pathMaps,
             );
     
             const score = recomputeScore(
                 updatedMaze,
                 metrics,
             );*/

        // 6. Update editor state

    };

    return {
        mazeData,
        handleWallClick,
        metrics, error
    };
}
