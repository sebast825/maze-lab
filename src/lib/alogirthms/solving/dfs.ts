import { Maze, Position } from "@/lib/maze/types";
import { getNeighbors } from "@/lib/maze/core";
import { hasWallWithNeighbor } from "@/lib/maze/walls";

/*
 will return each posible path to find the solution
 */
export const findAllPaths = (
  maze: Maze,
  start: Position,
  end: Position,
): Position[][] => {
  let result: Position[][] = [];
  let path: Position[] = [];
  let visited: Set<string> = new Set();
  dfs(maze, start, end, path, visited, result);
  return result;
};
const dfs = (
  maze: Maze,
  current: Position,
  end: Position,
  path: Position[],
  visited: Set<string>,
  result: Position[][],
) => {
  // Unique identifier for the current cell (used for cycle detection)
  const key = `${current.row},${current.col}`;

  // Add current node to the active path (this represents the current DFS branch)
  path.push(current);

  // Mark this node as visited in the current DFS traversal
  visited.add(key);

  // BASE CASE:
  // If we reached the end cell, we store a COPY of the current path
  if (current.row === end.row && current.col === end.col) {
    result.push([...path]); // IMPORTANT: copy to avoid mutation later
  } else {
    // Get all adjacent cells (based on maze structure / walls)
    const neighbors = getNeighbors(maze, current);

    // Filter neighbors that are actually reachable (no wall between current and neighbor)
    const neighborsWithoutWall: Position[] = neighbors.filter((neighbor) => {
      return !hasWallWithNeighbor(maze, current, neighbor);
    });

    // Explore each valid neighbor
    for (const next of neighborsWithoutWall) {
      const nextKey = `${next.row},${next.col}`;

      // Avoid cycles: do not revisit nodes already in the current path
      if (!visited.has(nextKey)) {
        // RECURSIVE CALL:
        // We go deeper into the graph exploring this branch
        dfs(maze, next, end, path, visited, result);
      }
    }
  }
  // BACKTRACKING STEP
  // Remove current node from the active path
  // (we are returning to the previous recursion level)
  path.pop();

  // Unmark node as visited so it can be used in OTHER branches
  // (this is what allows exploring different paths in DFS)
  visited.delete(key);
};
