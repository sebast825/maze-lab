import { LoopReason, Maze, Position } from "@/lib/maze/types";
import { LoopCandidate } from "./types";
import { removeWallBetween } from "@/lib/maze/walls";
import { bfs } from "../../solving/bfs";
import { MazePathMaps, BFSResult } from "../../solving/types";

export const calculateCandidateLimit = (rows: number, cols: number): number => {
  const totalCells = rows * cols;

  if (totalCells <= 400) return 1;
  if (totalCells <= 900) return 3;
  return 4;
};
export const removeWallAtSomeCandiates = (
  candidates: LoopCandidate[],
  maze: Maze,
) => {
  for (let i = 0; i < 10 && i < candidates.length; i++) {
    let candidate: LoopCandidate | undefined = candidates[i];

    if (!candidate) break;
    maze.cells[candidate.from.row][candidate.from.col].loopReason =
      getDominantScore(candidate);
    maze.cells[candidate.to.row][candidate.to.col].loopReason =
      getDominantScore(candidate);
    removeWallBetween(maze, candidate.from, candidate.to);
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
export const isNear = (
  a: Position,
  b: Position,
  maxDistance: number,
): boolean => {
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

export const addColorToBackBone = (backbone: Position[], maze: Maze) => {
  backbone.forEach(
    (elem) => (maze.cells[elem.row][elem.col].isBackBone = true),
  );
};

export const generateMazePathMaps = (maze: Maze, start: Position, end: Position): MazePathMaps => {
  const { cellInfo: fromStart }: BFSResult = bfs(maze, end, start);
  const { cellInfo: fromEnd }: BFSResult = bfs(maze, start, end);

  return { fromStart, fromEnd };
}