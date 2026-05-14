import {
  handleMazeGenerationDFS,
  createMazeSizeDFS,
} from "@/lib/alogirthms/generation/dfs";
import { bfs } from "@/lib/alogirthms/solving/bfs";
import { BFSResult } from "@/lib/alogirthms/solving/types";
import { Maze, Position } from "@/lib/maze/types";
import { useEffect, useState } from "react";

export const useMazeGenerator = () => {
  const [maze, setMaze] = useState<Maze | null>(null);
  const [path, setPath] = useState<{ x: number; y: number }[] | null>(null);
  useEffect(() => {
    solveMaze();
  }, [maze]);
  const createMaze = () => {
    const newMaze = handleMazeGenerationDFS(createMazeSizeDFS(20, 20));

    setMaze(newMaze);
  };
  const solveMaze = () => {
   if(maze == null) return;
    const { cellInfo, farthest }: BFSResult = bfs(maze!, { x: 0, y: 0 });

    let current: Position | null = farthest;
    const reconstructedPath: Position[] = [];
    while (current) {
      reconstructedPath.unshift(current);
      current = cellInfo[current.x]?.[current.y].parent || null;
      if (current && current.x == 0 && current.y == 0) {
        reconstructedPath.unshift(current);
        break;
      }
    }

    setPath(reconstructedPath);
  };

  return { maze, path, createMaze, solveMaze };
};
