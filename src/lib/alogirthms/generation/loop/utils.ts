import { Maze, Position} from "@/lib/maze/types";
import { LoopCandidate } from "./types";
import { removeWallBetween } from "@/lib/maze/walls";

export const removeWallAtSomeCandiates = (
  candidates: LoopCandidate[],
  maze: Maze,
) => {
  for (let i = 0; i <= 2; i++) {
    let candidate: LoopCandidate = candidates[i];
    removeWallBetween(maze, candidate.from, candidate.to);
    maze.cells[candidate.from.row][candidate.from.col].startPoint = true;
  }
};



export const isCandidateNearIntersection = (
  candidate: LoopCandidate,
  intersections: Position[],
): boolean => {
  const closeToIntersection = intersections.some(
    (intersection) =>
      isNear(candidate.from, intersection, 2) ||
      isNear(candidate.to, intersection, 2),
  );
  return closeToIntersection;
};
const isNear = (a: Position, b: Position, maxDistance: number) => {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col) <= maxDistance;
};

export const candidateHasIntersection = (
  candidate: LoopCandidate,
  intersections: Position[],
): boolean => {
  const from: Position = candidate.from;
  const to: Position = candidate.to;
  const isIntersection: boolean = intersections.some(
    (intersection) =>
      (intersection.col == from.col && intersection.row == from.row) ||
      (intersection.col == to.col && intersection.row == to.row),
  );
  return isIntersection;
};