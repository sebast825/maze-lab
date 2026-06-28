import { AlgorithmType } from ".";

export interface MazeAlgorithmInfo {
  name: string;
  description: string;
}

export const MAZE_GENERATION_UI_INFO: Record<AlgorithmType, MazeAlgorithmInfo> =
  {
    kruskal: {
      name: "Kruskal",
      description: `
Starts with all cells belonging to separate regions. It considers all walls between 
adjacent cells in random order, removing a wall only if it connects two different regions.
 Each merge combines those regions into one, and the process continues until all cells belong to a single connected region, 
 without forming cycles.
`.trim(),
    },

    prim: {
      name: "Prim",
      description: `
Starts from a random cell and grows a single connected region by expanding through a frontier
 of adjacent walls. At each step, it selects a wall that connects the current region to an unvisited cell, 
 removes it, and adds the new cell to the region. The process continues until all cells are part of the same region.
`.trim(),
    },

    dfs: {
      name: "Depth-First Search (DFS)",
      description: `
Starts from a random cell and performs a depth-first traversal over unvisited adjacent cells. 
It expands by carving paths into unvisited neighbors, and when a cell has no unvisited neighbors,
 it backtracks through the path until it finds a cell with remaining unvisited neighbors, then continues the process.
`.trim(),
    },

    worms: {
      name: "Worm (Random Walk Carving)",
      description: `
Starts from an initial cell and performs constrained random walks, carving a path step by step.
 When the current cell has no unvisited adjacent cells or the path reach a max length, a new starting point is selected from 
 previously visited cells to continue carving new corridors.
`.trim(),
    },

    tree: {
      name: "Multi-Growth (Tree Expansion)",
      description: `
Each expansion behaves like a growing branch of a tree, where new branches emerge from recent
 growth and stop when they can no longer expand or reach a max length.
`.trim(),
    },

    aldousBroder: {
      name: "Aldous-Broder",
      description: `
Starts from a random cell and performs a pure random walk over the grid. At each step, it moves to a randomly chosen adjacent cell. If the visited cell has not been seen before, it is carved into the maze. The process continues until all cells have been visited at least once.
`.trim(),
    },
    randomTraversal: {
      name: "Random Traversal",
      description: `
A variation of DFS that breaks strict directional paths. Instead of moving from the latest cell, 
it picks any discovered cell from the stack at random to continue carving. 
This removes the long, winding corridors typical of DFS, resulting in shorter branches and a more fragmented, unpredictable maze.
`.trim(),
    },
  };
