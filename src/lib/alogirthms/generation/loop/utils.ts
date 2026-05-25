import { LoopReason, Maze, Position } from "@/lib/maze/types";
import { LoopCandidate } from "./types";
import { removeWallBetween } from "@/lib/maze/walls";

export const removeWallAtSomeCandiates = (
  candidates: LoopCandidate[],
  maze: Maze,
) => {
  console.log(candidates.length);
  for (let i = 0; i < 3 && i < candidates.length; i++) {
    let candidate: LoopCandidate | undefined = candidates[i];
    console.log(i);

    if (!candidate) break;
    //  if(candidate.score.isIntersection) break
    console.log({ ...candidate });
    maze.cells[candidate.from.row][candidate.from.col].loopReason =
      getDominantScore(candidate);
    maze.cells[candidate.to.row][candidate.to.col].loopReason =
      getDominantScore(candidate);
    if (i < 5) {
      removeWallBetween(maze, candidate.from, candidate.to);
    }
  }
};
const getDominantScore = (candidate: LoopCandidate): LoopReason => {
  const { backboneDepth, branchDistance, intersectionPenalty, isIntersection } =
    candidate.score;

  const max = Math.max(backboneDepth, branchDistance, intersectionPenalty);
  if (isIntersection) {
    return "isIntersection";
  }
  if (max === branchDistance) {
    return "branchDistance";
  }

  if (max === backboneDepth) {
    return "backboneDepth";
  }

  return "intersectionPenalty";
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
