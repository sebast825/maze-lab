import { createEmptyMaze } from "../../../core";
import { removeWallBetween } from "../../../walls";
import { getDirectionBetweenCells, traceBranchUntilDecision } from "../branchAnalysis";


describe("traceBranchUntilDecision - Edge Cases", () => {
  it("should handle an immediate dead-end", () => {
    // Scenario: (0,0) [from] <-> (0,1) [init/dead-end]
    const maze = createEmptyMaze(1, 2);
    const from = { row: 0, col: 0 };
    const initBranchPosition = { row: 0, col: 1 };
    
    removeWallBetween(maze, from, initBranchPosition);

    const result = traceBranchUntilDecision(initBranchPosition, from, maze);

    expect(result).toEqual({
      branchLength: 0, // No movements performed from the initial cell
      from,
      to: initBranchPosition,
      lastNode: initBranchPosition,
      path: [initBranchPosition],
      endedBy: "dead-end",
    });
  });

  it("should handle an immediate decision/fork", () => {
    // Scenario: (0,1) is 'from'. (1,1) is 'init'.
    // From (1,1) the path splits West to (1,0) and East to (1,2) [T-junction]
    const maze = createEmptyMaze(2, 3);
    const from = { row: 0, col: 1 };
    const initBranchPosition = { row: 1, col: 1 };

    removeWallBetween(maze, from, initBranchPosition);
    removeWallBetween(maze, initBranchPosition, { row: 1, col: 0 });
    removeWallBetween(maze, initBranchPosition, { row: 1, col: 2 });

    const result = traceBranchUntilDecision(initBranchPosition, from, maze);

    expect(result).toEqual({
      branchLength: 0, // Cuts immediately because a choice exists at the start cell
      from,
      to: initBranchPosition,
      lastNode: initBranchPosition,
      path: [initBranchPosition],
      endedBy: "decision",
    });
  });

  it("should traverse a long corridor ending in a dead-end", () => {
    // Scenario: (0,0)[from] <-> (0,1)[init] <-> (0,2) <-> (0,3)[dead-end]
    const maze = createEmptyMaze(1, 4);
    const from = { row: 0, col: 0 };
    const initBranchPosition = { row: 0, col: 1 };

    removeWallBetween(maze, from, initBranchPosition);
    removeWallBetween(maze, { row: 0, col: 1 }, { row: 0, col: 2 });
    removeWallBetween(maze, { row: 0, col: 2 }, { row: 0, col: 3 });

    const result = traceBranchUntilDecision(initBranchPosition, from, maze);

    expect(result).toEqual({
      branchLength: 2, // Steps taken: (0,1)->(0,2) and (0,2)->(0,3)
      from,
      to: initBranchPosition,
      lastNode: { row: 0, col: 3 },
      path: [
        { row: 0, col: 1 },
        { row: 0, col: 2 },
        { row: 0, col: 3 },
      ],
      endedBy: "dead-end",
    });
  });

  it("should traverse a long corridor ending in a decision point", () => {
    // Scenario: (0,0)[from] <-> (0,1)[init] <-> (0,2) <-> (0,3)[fork] -> leads to (0,4) or (1,3)
    const maze = createEmptyMaze(2, 5);
    const from = { row: 0, col: 0 };
    const initBranchPosition = { row: 0, col: 1 };

    removeWallBetween(maze, from, initBranchPosition);
    removeWallBetween(maze, { row: 0, col: 1 }, { row: 0, col: 2 });
    removeWallBetween(maze, { row: 0, col: 2 }, { row: 0, col: 3 });
    
    // Open two alternative paths from (0,3)
    removeWallBetween(maze, { row: 0, col: 3 }, { row: 0, col: 4 });
    removeWallBetween(maze, { row: 0, col: 3 }, { row: 1, col: 3 });

    const result = traceBranchUntilDecision(initBranchPosition, from, maze);

    expect(result).toEqual({
      branchLength: 2, // Walks up to the intersection cell (0,3)
      from,
      to: initBranchPosition,
      lastNode: { row: 0, col: 3 },
      path: [
        { row: 0, col: 1 },
        { row: 0, col: 2 },
        { row: 0, col: 3 },
      ],
      endedBy: "decision",
    });
  });

  it("should never backtrack to the 'from' node under any circumstances", () => {
    // Scenario: (0,0)[from] <-> (0,1)[init]. Even if the wall back to 'from' is open 
    // and there are no other exits, it must not treat 'from' as a valid move forward.
    const maze = createEmptyMaze(1, 2);
    const from = { row: 0, col: 0 };
    const initBranchPosition = { row: 0, col: 1 };

    removeWallBetween(maze, from, initBranchPosition);

    const result = traceBranchUntilDecision(initBranchPosition, from, maze);

    // It must register as a dead-end immediately without adding 'from' to the path
    expect(result.endedBy).toBe("dead-end");
    expect(result.branchLength).toBe(0);
    expect(result.path).not.toContainEqual(from);
  });

  it("should stop by decision immediately if the initial cell is structurally part of a loop fork", () => {
    // Scenario: Immediate ring/loop layout
    // (0,0)[from] <-> (0,1)[init] <-> (0,2) 
    //                   |              ^
    //                   v              |
    //                 (1,1)   <----  (1,2)
    // From (0,1) two walls are open leading forward: East to (0,2) and South to (1,1).
    // The function must detect this structural fork instantly and halt.
    const maze = createEmptyMaze(2, 3);
    const from = { row: 0, col: 0 };
    const initBranchPosition = { row: 0, col: 1 };

    removeWallBetween(maze, from, initBranchPosition);
    removeWallBetween(maze, initBranchPosition, { row: 0, col: 2 });
    removeWallBetween(maze, { row: 0, col: 2 }, { row: 1, col: 2 });
    removeWallBetween(maze, { row: 1, col: 2 }, { row: 1, col: 1 });
    removeWallBetween(maze, { row: 1, col: 1 }, initBranchPosition);

    const result = traceBranchUntilDecision(initBranchPosition, from, maze);

    expect(result).toEqual({
      branchLength: 0,
      from,
      to: initBranchPosition,
      lastNode: initBranchPosition,
      path: [initBranchPosition],
      endedBy: "decision"
    });
  });
})


describe("getDirectionBetweenCells", () => {
  // We use test.each to run the same assertion logic over all cardinal directions
  test.each([
    {
      current: { row: 1, col: 1 },
      next: { row: 0, col: 1 },
      expected: "north",
      description: "should return 'north' when moving up one row",
    },
    {
      current: { row: 1, col: 1 },
      next: { row: 2, col: 1 },
      expected: "south",
      description: "should return 'south' when moving down one row",
    },
    {
      current: { row: 1, col: 1 },
      next: { row: 1, col: 2 },
      expected: "east",
      description: "should return 'east' when moving right one column",
    },
    {
      current: { row: 1, col: 1 },
      next: { row: 1, col: 0 },
      expected: "west",
      description: "should return 'west' when moving left one column",
    },
  ])("$description", ({ current, next, expected }) => {
    const result = getDirectionBetweenCells(current, next);
    expect(result).toBe(expected);
  });
});