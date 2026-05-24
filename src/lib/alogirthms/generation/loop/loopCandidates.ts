import { Position, Maze } from "@/lib/maze/types";
import { getNeighbors } from "@/lib/maze/core";
import { BFSResult, CellInfo } from "../../solving/types";
import { getBackBoneOfBranchCell } from "./backbone";
import { LoopCandidate } from "./types";
import { hasWallWithNeighbor } from "@/lib/maze/walls";
import { bfs } from "../../solving/bfs";

export const filterLoopCandates = (
  candidates: LoopCandidate[],
  cellInfo: CellInfo[][],
  backboneRoute: Position[],
  maze: Maze,
  intersections: Position[],
): LoopCandidate[] => {
  return (
    candidates
      .map((candidate) => {
        // avoid direct parent connection
        const parent = cellInfo[candidate.from.row][candidate.from.col].parent;
        if (
          parent &&
          parent.row === candidate.to.row &&
          parent.col === candidate.to.col
        ) {
          candidate.score -= 1;
          return candidate;
        }

        candidate = scoreCandidateDepth(candidate, cellInfo, backboneRoute);
        candidate = scoreCandidateByDistance(candidate, maze);
        candidate = penalizeIntersection(candidate, intersections);
        return candidate;
      }) // remove very bad candidates
      .filter((candidate) => candidate.score > 0)
      // prioritize best candidates first
      .sort((a, b) => b.score - a.score)
  );
};

const penalizeIntersection = (
  candidate: LoopCandidate,
  intersections: Position[],
): LoopCandidate => {
  const from: Position = candidate.from;
  const to: Position = candidate.to;
  const isIntersection: boolean = intersections.some(
    (intersection) =>
      (intersection.col == from.col && intersection.row == from.row) ||
      (intersection.col == to.col && intersection.row == to.row),
  );
  if (isIntersection) {
    candidate.score *= 0.5;
  }
  return candidate;
};
const scoreCandidateByDistance = (
  candidate: LoopCandidate,
  maze: Maze,
): LoopCandidate => {
  let { cellInfo }: BFSResult = bfs(maze, candidate.to);
  let distance: number =
    cellInfo[candidate.from.row][candidate.from.col].distance;

  candidate.score += distance * 5;
  return candidate;
};

const scoreCandidateDepth = (
  candidate: LoopCandidate,
  cellInfo: CellInfo[][],
  backboneRoute: Position[],
): LoopCandidate => {
  const { backBone: fromBackBone, steps: stepsFrom } = getBackBoneOfBranchCell(
    candidate.from,
    cellInfo,
    backboneRoute,
  );

  const { backBone: toBackBone, steps: stepsTo } = getBackBoneOfBranchCell(
    candidate.to,
    cellInfo,
    backboneRoute,
  );
  // avoid loops inside same major branch
  if (
    fromBackBone.row === toBackBone.row &&
    fromBackBone.col === toBackBone.col
  ) {
    return {
      ...candidate,
      score: -50,
    };
  }
  // return candidate with computed score
  return {
    ...candidate,
    //stablish score base on distance from each cell to backBone, this will join cells if are very farm from main path
    score: stepsFrom + stepsTo,
  };
};

//for each cell in branch we get the neighbors with wall
export const getLoopCandidates = (
  branches: Position[],
  maze: Maze,
): LoopCandidate[] => {
  const loopCandidate: LoopCandidate[] = [];
  branches.forEach((cell) => {
    const neighbors: Position[] = getNeighbors(maze, cell);
    neighbors.forEach((neighbor) => {
      if (hasWallWithNeighbor(maze, cell, neighbor)) {
        //this if avoid duplicates for example to have relation A-B and B-A
        if (
          cell.row > neighbor.row ||
          (cell.row === neighbor.row && cell.col > neighbor.col)
        ) {
          loopCandidate.push({ from: cell, to: neighbor, score: 0 });
        }
      }
    });
  });
  return loopCandidate;
};
