import { Maze, Position } from "@/lib/maze/types";
import {
  getMazeStartPoint,
  getNeighborsNotVisited,
  removeWallBetween,
  selectRandomPosition,
} from "@/lib/maze/utils";

import { connectDisconnectedRegions } from "./ensureConnectivity";

export const generateThree = (maze: Maze): Maze => {
  let threeHeads: Position[] = [];
  const startPoint: Position = getMazeStartPoint(maze);
  maze.cells[startPoint.row][startPoint.col].startPoint = true;

  threeHeads.push(startPoint);
  while (threeHeads.length > 0) {
    const head: Position = selectRandomPosition(threeHeads);
    growTunnel(head, maze, threeHeads);
  }
  return connectDisconnectedRegions(maze);
};

const growTunnel = (head: Position, maze: Maze, threeHeads: Position[]) => {
  setCellVisited(head, maze);
  removePositionFromArray(head, threeHeads);
  maze.cells[head.row][head.col].isHead = true;
  const threeMaxLenght: number = 4;
  let currentThreeLength: number = 0;
  let current: Position = head;
  while (currentThreeLength < threeMaxLenght) {
    const neighbors = getNeighborsNotVisited(maze, current);
    if (neighbors.length == 0) {
      break;
    }
    const neighbor: Position = selectRandomPosition(neighbors);
    removeWallBetween(maze, current, neighbor);
    setCellVisited(neighbor, maze);
    current = neighbor;
    currentThreeLength++;
  }
  handleNewHeads(maze, current, threeHeads);
};

const handleNewHeads = (
  maze: Maze,
  current: Position,
  threeHeads: Position[],
): void => {
  const neighbors = getNeighborsNotVisited(maze, current);
  // Randomize neighbors order, so branching feels organic
  const shuffled = [...neighbors].sort(() => Math.random() - 0.5);
  // Only use 2 of the neighbors to avoid excesibre branching
  const selected = shuffled.slice(0, 2);

  selected.forEach((neighbor) => {
    removeWallBetween(maze, current, neighbor);
    setCellVisited(neighbor, maze);
    threeHeads.push(neighbor);
  });
};
const setCellVisited = (pos: Position, maze: Maze): void => {
  maze.cells[pos.row][pos.col].visited = true;
};

//replace the position to be removed with the las value and remove last index
const removePositionFromArray = (pos: Position, array: Position[]) => {
  const index = array.findIndex((p) => p.row === pos.row && p.col === pos.col);
  if (index !== -1) {
    array[index] = array[array.length - 1];
    array.pop();
  }
};
