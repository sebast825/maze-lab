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

export const getBalancedCandidates = (
  maze: Maze,
  structure: MazeStructureAnalysis,
  MazePathMaps: MazePathMaps,
  backboneRoute: Position[],
): LoopCandidate[] => {
  // 1. Get initial loop candidates
  console.time("⏱️ 1. getLoopCandidates");
  const loopCandidates: LoopCandidate[] = getLoopCandidates(
    structure.branches,
    maze,
  );
  console.timeEnd("⏱️ 1. getLoopCandidates");

  // 2. Score candidates
  console.time("⏱️ 2. scoreLoopCandidates");
  const scoreCandadidates: LoopCandidate[] = scoreLoopCandidates(
    loopCandidates,
    MazePathMaps,
    backboneRoute,
    structure.intersections,
  );
  console.timeEnd("⏱️ 2. scoreLoopCandidates");

  // 3. Filter by distance
  console.time("⏱️ 3. filterCandidatesByDistance");
  const filterByDistance: LoopCandidate[] =
    filterCandidatesByDistance(scoreCandadidates);
  console.timeEnd("⏱️ 3. filterCandidatesByDistance");

  // 4. Sort by region
  console.time("⏱️ 4. sortCandidatesByRegion");
  const sortByRegion = sortCandidatesByRegion(filterByDistance, maze);
  console.timeEnd("⏱️ 4. sortCandidatesByRegion");

  // 5. Slice total results
  console.time("⏱️ 5. sliceCandidates");
  const sliceCandidates: LoopCandidate[] = sortByRegion.slice(
    0,
    calculateCandidateLimit(maze.rows, maze.cols),
  );
  console.timeEnd("⏱️ 5. sliceCandidates");

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
  //console.log(pathA,pathB)
  candidate.score.branchDistance = Math.min(pathA, pathB);
  return candidate
}
export const scoreLoopCandidates = (
  candidates: LoopCandidate[],
  mazePathMaps: MazePathMaps,
  backboneRoute: Position[],
  intersections: Position[],
): LoopCandidate[] => {
  // Variables para acumular tiempos
  let tDepth = 0, tDistance = 0, tPenalty = 0, tFinal = 0;
  let iterations = 0;

  // Variables para métricas de branchDistance
  let maxDistance = -Infinity;
  let minDistance = Infinity;
  let totalDistanceSum = 0;
  const uniqueDistances = new Set<number>();

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

    iterations++;

    // 1. scoreCandidateDepth
    const startDepth = performance.now();
    candidate = scoreCandidateDepth(candidate, mazePathMaps.fromStart, backboneRoute);
    tDepth += performance.now() - startDepth;


    // 2. scoreCandidateByDistance (manteniendo tus parámetros)
    const startDistance = performance.now();
    candidate = scoreCandidateByDistance(candidate, mazePathMaps);
    tDistance += performance.now() - startDistance;

    // Métricas de distancia
    const currentDist = 0;
    if (currentDist > maxDistance) maxDistance = currentDist;
    if (currentDist < minDistance) minDistance = currentDist;
    totalDistanceSum += currentDist;
    uniqueDistances.add(currentDist);

    // 3. applyIntersectionPenalty
    const startPenalty = performance.now();
    candidate = applyIntersectionPenalty(candidate, intersections);
    tPenalty += performance.now() - startPenalty;

    // 4. calculateFinalScore
    const startFinal = performance.now();
    candidate = calculateFinalScore(candidate);
    tFinal += performance.now() - startFinal;


    return candidate;
  });
  console.log("scoreCandidateDepth: ", tDepth)
  console.log("scoreCandidateByDistance: ", tDistance)
  console.log("applyIntersectionPenalty: ", tPenalty)
  console.log("calculateFinalScore: ", tFinal)
  
  return (
    mappedCandidates
      // remove very bad candidates
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
