import { Maze} from "@/lib/maze/types";
import { removeWallBetween } from "@/lib/maze/utils";
import { LoopCandidate } from "./types";

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
