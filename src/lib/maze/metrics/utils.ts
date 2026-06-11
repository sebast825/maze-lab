import { getNeighborsByOpenWall } from "@/lib/alogirthms/solving/bfs";
import { Maze, Position } from "../types";

export const getTotalIntersections = (maze: Maze): number => {
  let interesections: number = 0;
  for (let r = 0; r < maze.rows; r++) {
    for (let c = 0; c < maze.cols; c++) {
      const neighbors: Position[] = getNeighborsByOpenWall(maze, {
        row: r,
        col: c,
      });
      if (neighbors.length >= 3) interesections++;
    }
  }
  return interesections;
};