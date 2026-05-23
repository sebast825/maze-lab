import { Maze} from "@/lib/maze/types";
import { LoopCandidate } from "./types";
import { removeWallBetween } from "@/lib/maze/walls";

export const removeWallAtSomeCandiates = (
  candidates: LoopCandidate[],
  maze: Maze,
) => {
  for (let i = 0; i <= 7; i++) {
    let candidate: LoopCandidate = candidates[i];
    removeWallBetween(maze, candidate.from, candidate.to);
    maze.cells[candidate.from.row][candidate.from.col].startPoint = true;
  }
};
