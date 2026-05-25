import { Position, Maze } from "@/lib/maze/types";
import { getNeighbors } from "@/lib/maze/core";
import { BFSResult, CellInfo } from "../../solving/types";
import { getBackBoneOfBranchCell } from "./backbone";
import { LoopCandidate } from "./types";
import { hasWallWithNeighbor } from "@/lib/maze/walls";
import { bfs } from "../../solving/bfs";
import {
  candidateHasIntersection,
  isCandidateNearIntersection,
  isNear,
} from "./utils";
export const sortCandidatesByRegion = (
  candidates: LoopCandidate[],
  maze: Maze,
) => {
  const regions: Record<string, LoopCandidate[]> = {
    upLeft: [],
    upRight: [],
    downLeft: [],
    downRight: [],
  };
  const midRow = Math.floor(maze.rows / 2);
  const midCol = Math.floor(maze.cols / 2);
  candidates.forEach((candidate) => {
    // Determinamos la región basada en la posición
    const isBottom = candidate.from.row >= midRow;
    const isRight = candidate.from.col >= midCol;

    if (isBottom) {
      isRight
        ? regions.downRight.push(candidate)
        : regions.downLeft.push(candidate);
    } else {
      isRight
        ? regions.upRight.push(candidate)
        : regions.upLeft.push(candidate);
    }
  });
  let balancedCandidates: LoopCandidate[] = [];
  //we add all the values in the response, but one from each group at the time, so the balance is distributed in the maze
  const groups = Object.values(regions);
  const maxDepth = Math.max(...groups.map((g) => g.length));
  for (let i = 0; i < maxDepth; i++) {
    groups.forEach((group) => {
      if (group[i]) {
        balancedCandidates.push(group[i]);
      }
    });
  }
  return balancedCandidates;
};
export const filterCandidatesByDistance = (
  candidates: LoopCandidate[],
): LoopCandidate[] => {
  const selected: LoopCandidate[] = [];

  for (const candidate of candidates) {
    const isTooClose = selected.some((selectedCandidate) => {
      return (
        isNear(candidate.from, selectedCandidate.from, 6) ||
        isNear(candidate.from, selectedCandidate.to, 6) ||
        isNear(candidate.to, selectedCandidate.from, 6) ||
        isNear(candidate.to, selectedCandidate.to, 6)
      );
    });
    // only keep candidates far enough
    if (!isTooClose) {
      selected.push(candidate);
    }
  }

  return selected;
};

export const scoreLoopCandidates = (
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
          candidate.score.finalScore -= 1;
          return candidate;
        }

        candidate = scoreCandidateDepth(candidate, cellInfo, backboneRoute);
        candidate = scoreCandidateByDistance(candidate, maze);
        candidate = applyIntersectionPenalty(candidate, intersections);
        candidate = calculateFinalScore(candidate);
        return candidate;
      }) // remove very bad candidates
      .filter((candidate) => candidate.score.finalScore > 0)
      // prioritize best candidates first
      .sort((a, b) => b.score.finalScore - a.score.finalScore)
  );
};
const calculateFinalScore = (candidate: LoopCandidate) => {
  const dividedBy =
    candidate.score.intersectionPenalty == 0
      ? 1
      : candidate.score.intersectionPenalty;
  candidate.score.finalScore =
    (candidate.score.backboneDepth * 5 + candidate.score.branchDistance) /
    dividedBy;

  return candidate;
};
const applyIntersectionPenalty = (
  candidate: LoopCandidate,
  intersections: Position[],
): LoopCandidate => {
  const isNearIntersection = isCandidateNearIntersection(
    candidate,
    intersections,
  );

  const touchesIntersection = candidateHasIntersection(
    candidate,
    intersections,
  );

  if (touchesIntersection) {
    candidate.score.isIntersection = true;
    candidate.score.intersectionPenalty += 5;
  }

  if (isNearIntersection) {
    candidate.score.intersectionPenalty += 3;
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

  candidate.score.branchDistance += distance;
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
    candidate.score.backboneDepth = -50;
    return candidate;
  }
  // return candidate with computed score
  candidate.score.backboneDepth = stepsFrom + stepsTo;
  return candidate;
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
          loopCandidate.push({
            from: cell,
            to: neighbor,
            score: {
              backboneDepth: 0,
              branchDistance: 0,
              intersectionPenalty: 0,
              isIntersection: false,
              finalScore: 0,
            },
          });
        }
      }
    });
  });
  return loopCandidate;
};
