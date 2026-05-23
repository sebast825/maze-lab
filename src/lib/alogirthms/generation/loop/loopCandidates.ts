import { Position, Maze } from "@/lib/maze/types";
import { getNeighbors } from "@/lib/maze/utils";
import { CellInfo } from "../../solving/types";
import { getBackBoneOfBranchCell } from "./backbone";
import { LoopCandidate } from "./types";
import { hasWallWithNeighbor } from "./utils";

export const filterLoopCandates = (
  candidates: LoopCandidate[],
  cellInfo: CellInfo[][],
  backboneRoute: Position[],
): LoopCandidate[] => {
  return (
    candidates
      .map((candidate) => {
        // avoid direct parent connection
        const parent = cellInfo[candidate.from.row][candidate.from.col].parent;
        // compare coordinates, NOT object reference
        if (
          parent &&
          parent.row === candidate.to.row &&
          parent.col === candidate.to.col
        ) {
          candidate.score - 1;
          return candidate;
        }

        const { backBone: fromBackBone, steps: stepsFrom } =
          getBackBoneOfBranchCell(candidate.from, cellInfo, backboneRoute);

        const { backBone: toBackBone, steps: stepsTo } =
          getBackBoneOfBranchCell(candidate.to, cellInfo, backboneRoute);

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
      }) // remove very bad candidates
      .filter((candidate) => candidate.score > 0)
      // prioritize best candidates first
      .sort((a, b) => b.score - a.score)
  );
};


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