import { Maze, Position } from "@/lib/maze/types";

export function union(parent: number[], id1: number, id2: number): boolean {
  const root1 = find(parent, id1);
  const root2 = find(parent, id2);
  console.log("valueInArray ", root1, root2);
  //we update the parent index, so they became part of the same group
  if (root1 !== root2) {
    console.log("bef---Parent, ", parent);
    parent[root1] = root2;
    console.log("aft ---Parent, ", parent);

    return true;
  }
  return false;
}
export function find(parent: number[], id: number) {
  //find parent id
  if (parent[id] !== id) parent[id] = find(parent, parent[id]);
  return parent[id];
}

export function getWallsWithNeighbor(
  maze: Maze,
): { cell1: Position; cell2: Position }[] {
  let walls: { cell1: Position; cell2: Position }[] = [];

  for (let row = 0; row < maze.rows; row++) {
    for (let col = 0; col < maze.cols; col++) {
      if (col + 1 < maze.cols) {
        walls.push({
          cell1: { row: row, col: col },
          cell2: { row: row, col: col + 1 },
        });
      }
      if (row + 1 < maze.rows) {
        walls.push({
          cell1: { row: row, col: col },
          cell2: { row: row + 1, col: col },
        });
      }
    }
  }
  return walls;
}
