import { Position, Maze } from "@/lib/maze/types";
import { getNeighbors } from "@/lib/maze/core";
import { BFSResult, CellInfo, MazePathMaps } from "../../solving/types";
import { getBackBoneOfBranchCell } from "./backbone";
import { LoopCandidate, MazeStructureAnalysis } from "./types";
import { hasWallWithNeighbor } from "@/lib/maze/walls";
import {
  calculateCandidateLimit,
  candidateHasIntersection,
  isCandidateNearIntersection,
  isNear,
} from "./utils";
import { getMetricStats } from "@/lib/infrastructure/benchmark/metricStats/getMetrics";

export const getBalancedCandidates = (
  maze: Maze,
  structure: MazeStructureAnalysis,
  MazePathMaps: MazePathMaps,
  backboneRoute: Set<string>,
): LoopCandidate[] => {

  const loopCandidates: LoopCandidate[] = getLoopCandidates(
    structure.branches,
    maze,
  );

  const scoreCandadidates: LoopCandidate[] = scoreLoopCandidates(
    loopCandidates,
    MazePathMaps,
    backboneRoute,
    structure.intersections,
  );

  const filterByDistance: LoopCandidate[] =
    filterCandidatesByDistance(scoreCandadidates);

  const sortByRegion = sortCandidatesByRegion(filterByDistance, maze);

  const sliceCandidates: LoopCandidate[] = sortByRegion.slice(
    0,
    calculateCandidateLimit(maze.rows, maze.cols),
  );
  return sliceCandidates;
};
const sortCandidatesByRegion = (
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
    // We determine the region based on the position
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
const filterCandidatesByDistance = (
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
const scoreCandidateByDistance = (candidate: LoopCandidate, mazePathMaps: MazePathMaps,): LoopCandidate => {
  // Path A: From Start to 'from' + From 'to' to End
  const pathA = mazePathMaps.fromStart[candidate.from.row][candidate.from.col].distance +
    mazePathMaps.fromEnd[candidate.to.row][candidate.to.col].distance;
  // Path B: From Start to 'to' + From 'from' to End
  const pathB = mazePathMaps.fromStart[candidate.to.row][candidate.to.col].distance +
    mazePathMaps.fromEnd[candidate.from.row][candidate.from.col].distance;
  // Simulates bidirectional travel through the shortcut; the minimum represents the optimal loop path cost
  candidate.score.branchDistance = Math.min(pathA, pathB);
  return candidate
}
export const scoreLoopCandidates = (
  candidates: LoopCandidate[],
  mazePathMaps: MazePathMaps,
  backboneRoute: Set<string>,
  intersections: Position[],
): LoopCandidate[] => {

  const mappedCandidates = candidates.map((candidate) => {
    // avoid direct parent connection
    const parent = mazePathMaps.fromStart[candidate.from.row][candidate.from.col].parent;
    if (
      parent &&
      parent.row === candidate.to.row &&
      parent.col === candidate.to.col
    ) {
      candidate.score.finalScore -= 1;
      return candidate;
    }

    candidate = scoreCandidateDepth(candidate, mazePathMaps.fromStart, backboneRoute);
    candidate = scoreCandidateByDistance(candidate, mazePathMaps);
    // Must run after scoreCandidateByDistance because the intersection penalty uses the computed branchDistance value
    candidate = applyintersectionScore(candidate, intersections);
    candidate = calculateFinalScore(candidate);
    return candidate;
  });

  //log how all metrics influence in the score
  /*
    const scoreRows = candidates.map(c => c.score);
    const stats = getMetricStats(scoreRows);
  
    console.table(stats);*/


  return (
    mappedCandidates
      // remove very bad candidates
      .filter((candidate) => candidate.score.finalScore > 0)
      // prioritize best candidates first
      .sort((a, b) => b.score.finalScore - a.score.finalScore)
  );
};

const calculateFinalScore = (candidate: LoopCandidate) => {
  const { score } = candidate;

  // Candidates connecting cells from the same major branch are invalid.
  // Apply a terminal penalty so they cannot be selected later by score.
  if (score.backboneDepth === -50) {
    score.finalScore = -1; // Removed by the final score filter.
    return candidate;
  }

  // Weight factors used to balance the contribution of each component.
  const DEPTH_WEIGHT = 2;
  // Intersection penalty multiplier.
  const INTERSECTION_WEIGHT = 7;

  const baseScore =
    score.backboneDepth * DEPTH_WEIGHT +
    score.branchDistance;

  const penalty =
    score.intersectionScore * INTERSECTION_WEIGHT;

  // Final score used for candidate ranking.
  score.finalScore = baseScore - penalty;

  // Store weighted values for debugging and score breakdown visualization.
  score.backboneDepth =
    score.backboneDepth * DEPTH_WEIGHT;

  score.intersectionScore = penalty;

  return candidate;
};

// Requires candidate.score.branchDistance to be computed beforehand.
const applyintersectionScore = (
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
  candidate.score.isIntersection = touchesIntersection;
  const branchDistance = candidate.score.branchDistance;
  if (touchesIntersection) {
    candidate.score.intersectionScore += branchDistance * .10;
  }

  if (isNearIntersection) {
    candidate.score.intersectionScore += branchDistance * .05;
  }

  return candidate;
};



const scoreCandidateDepth = (
  candidate: LoopCandidate,
  cellInfo: CellInfo[][],
  backboneRoute: Set<string>,
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
const getLoopCandidates = (
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
              intersectionScore: 0,
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