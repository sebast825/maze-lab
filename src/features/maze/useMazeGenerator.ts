import { handleMazegeneratAldousBroader } from "@/lib/alogirthms/generation/aldous-broader";
import { handleMazeGenerationDFS } from "@/lib/alogirthms/generation/dfs";
import { handleMazeGenerationPrim } from "@/lib/alogirthms/generation/prim";
import { bfs } from "@/lib/alogirthms/solving/bfs";
import { BFSResult } from "@/lib/alogirthms/solving/types";
import { MazeData, Position } from "@/lib/maze/types";
import { createEmptyMaze } from "@/lib/maze/utils";
import { useState } from "react";

export const useMazeGenerator = () => {
  const [mazeData, setMazeData] = useState<MazeData | null>(null);

  const createMaze = () => {
    const maze = handleMazegeneratAldousBroader(createEmptyMaze(20, 20));

    const { cellInfo, farthest }: BFSResult = bfs(maze, {
      x: 15,
      y: 0,
    });

    let start: Position = { x: 0, y: 0 };
    let end: Position = { x: 15, y: 0 };

    let current: Position | null = farthest;
    const reconstructedPath: Position[] = [];
    while (current) {
      reconstructedPath.unshift(current);
      current = cellInfo[current.x]?.[current.y].parent || null;
      if (current && current.x == end.x && current.y == end.y) {
        start = {
          x: reconstructedPath[reconstructedPath.length - 1].x,
          y: reconstructedPath[reconstructedPath.length - 1].y,
        };
        reconstructedPath.unshift(current);
        break;
      }
    }
    const newMazeData: MazeData = {
      maze,
      start,
      end,
      solution: reconstructedPath,
    };
    setMazeData(newMazeData);
  };

  return { mazeData, createMaze };
};
