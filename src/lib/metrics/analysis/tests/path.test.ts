import { createEmptyMaze } from "@/lib/maze/core";
import { Position } from "@/lib/maze/types";
import { removeWallBetween } from "@/lib/maze/walls";
import { countDecisionNodesInPath } from "../pathAnalysis";

describe("countDecisionNodesInPath", () => {
  // Case 1: Straight line (No turns, no decisions)
  it("should return 0 for a straight linear path with no intersections", () => {
    // Scenario: (0,0) <-> (0,1) <-> (0,2)
    const maze = createEmptyMaze(1, 3);
    const path: Position[] = [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
    ];
    removeWallBetween(maze, { row: 0, col: 0 }, { row: 0, col: 1 });
    removeWallBetween(maze, { row: 0, col: 1 }, { row: 0, col: 2 });

    const result = countDecisionNodesInPath(path, maze);
    expect(result).toEqual(0);
  });

  // Case 2: Path turns (L-shaped turn, but still a single corridor with no branches)
  it("should handle a path with a turn but no choice/intersection", () => {
    // Scenario: (0,0) <-> (0,1)
    //                     ↓
    //                    (1,1)
    const maze = createEmptyMaze(2, 2);
    const path: Position[] = [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 1, col: 1 },
    ];
    removeWallBetween(maze, { row: 0, col: 0 }, { row: 0, col: 1 });
    removeWallBetween(maze, { row: 0, col: 1 }, { row: 1, col: 1 });

    const result = countDecisionNodesInPath(path, maze);
    // NOTE: If your logic considers a forced turn WITHOUT options as a decision, change this to 1.
    // If it only counts when the user can "choose" to go elsewhere, it should be 0.
    expect(result).toEqual(0);
  });

  // Case 3: Real T-junction intersection (Path passes through a node that offers choices)
  it("should increment count when path crosses a T-junction", () => {
    // Scenario: Path goes from (0,0) to (0,2).
    // At (0,1) we open a wall downwards to (1,1), creating a T-junction.
    // Path: (0,0) <-> (0,1) [Junction] <-> (0,2)
    //                     ↓ (Wall is open, but path doesn't go this way)
    //                    (1,1)
    const maze = createEmptyMaze(2, 3);
    const path: Position[] = [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
    ];
    
    // Build the T-junction
    removeWallBetween(maze, { row: 0, col: 0 }, { row: 0, col: 1 });
    removeWallBetween(maze, { row: 0, col: 1 }, { row: 0, col: 2 });
    removeWallBetween(maze, { row: 0, col: 1 }, { row: 1, col: 1 }); // Extra option

    const result = countDecisionNodesInPath(path, maze);
    expect(result).toEqual(1);
  });

  // Case 4: Multiple decision nodes along the same path
  it("should count multiple decision nodes along the path", () => {
    // Scenario: A long path that crosses two different intersections
    const maze = createEmptyMaze(3, 3);
    const path: Position[] = [
      { row: 0, col: 0 },
      { row: 0, col: 1 }, // Intersection 1
      { row: 0, col: 2 },
      { row: 1, col: 2 }, // Intersection 2
      { row: 2, col: 2 },
    ];

    // Main path
    removeWallBetween(maze, { row: 0, col: 0 }, { row: 0, col: 1 });
    removeWallBetween(maze, { row: 0, col: 1 }, { row: 0, col: 2 });
    removeWallBetween(maze, { row: 0, col: 2 }, { row: 1, col: 2 });
    removeWallBetween(maze, { row: 1, col: 2 }, { row: 2, col: 2 });

    // Secondary paths that create the decisions
    removeWallBetween(maze, { row: 0, col: 1 }, { row: 1, col: 1 }); // Detour at Intersection 1
    removeWallBetween(maze, { row: 1, col: 2 }, { row: 1, col: 1 }); // Detour at Intersection 2

    const result = countDecisionNodesInPath(path, maze);
    expect(result).toEqual(2);
  });

  // Edge case: Path ends immediately at a dead-end
  it("should handle an immediate dead-end", () => {
    const maze = createEmptyMaze(1, 2);
    const path: Position[] = [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
    ];
    removeWallBetween(maze, { row: 0, col: 0 }, { row: 0, col: 1 });

    const result = countDecisionNodesInPath(path, maze);
    expect(result).toEqual(0);
  });
});