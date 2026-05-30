import { MazeBenchmark } from "./types";

/**
 * 
 * Easy corridor
Dense dead ends
Long misleading branches
High overlap paths
Low overlap paths
Highly tortuous solution
Many intersections
Sparse intersections

name: "Short solution with many dead ends"
name: "Long solution with low ambiguity"
name: "Highly tortuous optimal path"
name: "Many equivalent routes"
name: "Dense decision network"
 */
export const RawMazeData: MazeBenchmark[] = [
  {
    name: "One rect path with low ambiguity",
    id: 1,

    algorithm: "three",
    maze: {
      rows: 20,
      cols: 20,
      cells: [
        [
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
            loopReason: "branchDistance",
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
            loopReason: "branchDistance",
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: false,
            walls: {
              north: true,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
            isHead: true,
          },
          {
            visited: false,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: false,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: false,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: false,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
          },
        ],
        [
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
            isHead: true,
          },
        ],
        [
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: false,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
        ],
        [
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
            isHead: true,
          },
          {
            visited: false,
            walls: {
              north: true,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: false,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: false,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: false,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: false,
            walls: {
              north: false,
              east: true,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
        ],
        [
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: false,
            },
            isHead: true,
          },
          {
            visited: false,
            walls: {
              north: true,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: true,
            },
          },
        ],
        [
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
            isHead: true,
          },
          {
            visited: false,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
          },
          {
            visited: false,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
        ],
        [
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: false,
            walls: {
              north: false,
              east: true,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
        ],
        [
          {
            visited: false,
            walls: {
              north: true,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
          },
          {
            visited: false,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: false,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: false,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: false,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: false,
            },
          },
        ],
        [
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: false,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: false,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: false,
            walls: {
              north: false,
              east: true,
              south: true,
              west: true,
            },
          },
          {
            visited: false,
            walls: {
              north: false,
              east: true,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
        ],
        [
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: false,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: false,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: false,
            walls: {
              north: true,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
        ],
        [
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: false,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: false,
            walls: {
              north: true,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
        ],
        [
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
        ],
        [
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: false,
            walls: {
              north: true,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
            isHead: true,
          },
        ],
        [
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: false,
            },
          },
        ],
        [
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: true,
            },
            startPoint: true,
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
        ],
        [
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: true,
            },
          },
        ],
        [
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: false,
            walls: {
              north: false,
              east: true,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
        ],
        [
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: false,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: false,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
        ],
        [
          {
            visited: false,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
        ],
        [
          {
            visited: false,
            walls: {
              north: false,
              east: true,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: false,
            walls: {
              north: true,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
        ],
      ],
    },
    paths: [
      [
        {
          row: 0,
          col: 0,
        },
        {
          row: 0,
          col: 1,
        },
        {
          row: 1,
          col: 1,
        },
        {
          row: 1,
          col: 2,
        },
        {
          row: 1,
          col: 3,
        },
        {
          row: 0,
          col: 3,
        },
        {
          row: 0,
          col: 4,
        },
        {
          row: 1,
          col: 4,
        },
        {
          row: 2,
          col: 4,
        },
        {
          row: 3,
          col: 4,
        },
        {
          row: 3,
          col: 3,
        },
        {
          row: 4,
          col: 3,
        },
        {
          row: 4,
          col: 2,
        },
        {
          row: 4,
          col: 1,
        },
        {
          row: 4,
          col: 0,
        },
        {
          row: 5,
          col: 0,
        },
        {
          row: 6,
          col: 0,
        },
        {
          row: 6,
          col: 1,
        },
        {
          row: 7,
          col: 1,
        },
        {
          row: 8,
          col: 1,
        },
        {
          row: 8,
          col: 0,
        },
        {
          row: 9,
          col: 0,
        },
        {
          row: 9,
          col: 1,
        },
        {
          row: 9,
          col: 2,
        },
        {
          row: 10,
          col: 2,
        },
        {
          row: 11,
          col: 2,
        },
        {
          row: 11,
          col: 3,
        },
        {
          row: 11,
          col: 4,
        },
        {
          row: 11,
          col: 5,
        },
        {
          row: 11,
          col: 6,
        },
        {
          row: 11,
          col: 7,
        },
        {
          row: 12,
          col: 7,
        },
        {
          row: 12,
          col: 8,
        },
        {
          row: 13,
          col: 8,
        },
        {
          row: 14,
          col: 8,
        },
        {
          row: 15,
          col: 8,
        },
        {
          row: 16,
          col: 8,
        },
        {
          row: 17,
          col: 8,
        },
        {
          row: 18,
          col: 8,
        },
        {
          row: 18,
          col: 9,
        },
        {
          row: 18,
          col: 10,
        },
        {
          row: 19,
          col: 10,
        },
        {
          row: 19,
          col: 11,
        },
        {
          row: 18,
          col: 11,
        },
        {
          row: 18,
          col: 12,
        },
        {
          row: 19,
          col: 12,
        },
        {
          row: 19,
          col: 13,
        },
        {
          row: 18,
          col: 13,
        },
        {
          row: 18,
          col: 14,
        },
        {
          row: 19,
          col: 14,
        },
        {
          row: 19,
          col: 15,
        },
        {
          row: 19,
          col: 16,
        },
        {
          row: 19,
          col: 17,
        },
        {
          row: 19,
          col: 18,
        },
        {
          row: 19,
          col: 19,
        },
      ],
      [
        {
          row: 0,
          col: 0,
        },
        {
          row: 1,
          col: 0,
        },
        {
          row: 2,
          col: 0,
        },
        {
          row: 3,
          col: 0,
        },
        {
          row: 3,
          col: 1,
        },
        {
          row: 4,
          col: 1,
        },
        {
          row: 4,
          col: 0,
        },
        {
          row: 5,
          col: 0,
        },
        {
          row: 6,
          col: 0,
        },
        {
          row: 6,
          col: 1,
        },
        {
          row: 7,
          col: 1,
        },
        {
          row: 8,
          col: 1,
        },
        {
          row: 8,
          col: 0,
        },
        {
          row: 9,
          col: 0,
        },
        {
          row: 9,
          col: 1,
        },
        {
          row: 9,
          col: 2,
        },
        {
          row: 10,
          col: 2,
        },
        {
          row: 11,
          col: 2,
        },
        {
          row: 11,
          col: 3,
        },
        {
          row: 11,
          col: 4,
        },
        {
          row: 11,
          col: 5,
        },
        {
          row: 11,
          col: 6,
        },
        {
          row: 11,
          col: 7,
        },
        {
          row: 12,
          col: 7,
        },
        {
          row: 12,
          col: 8,
        },
        {
          row: 13,
          col: 8,
        },
        {
          row: 14,
          col: 8,
        },
        {
          row: 15,
          col: 8,
        },
        {
          row: 16,
          col: 8,
        },
        {
          row: 17,
          col: 8,
        },
        {
          row: 18,
          col: 8,
        },
        {
          row: 18,
          col: 9,
        },
        {
          row: 18,
          col: 10,
        },
        {
          row: 19,
          col: 10,
        },
        {
          row: 19,
          col: 11,
        },
        {
          row: 18,
          col: 11,
        },
        {
          row: 18,
          col: 12,
        },
        {
          row: 19,
          col: 12,
        },
        {
          row: 19,
          col: 13,
        },
        {
          row: 18,
          col: 13,
        },
        {
          row: 18,
          col: 14,
        },
        {
          row: 19,
          col: 14,
        },
        {
          row: 19,
          col: 15,
        },
        {
          row: 19,
          col: 16,
        },
        {
          row: 19,
          col: 17,
        },
        {
          row: 19,
          col: 18,
        },
        {
          row: 19,
          col: 19,
        },
      ],
    ],
    metrics: {
      totalIntersections: 76,
      totalPaths: 2,
      shortestPathLength: 46,
      mazeDifficultyFeatures: {
        decisionPenalty: 270,
        ambiguity: 134,
        tortuosity: 187,
        deadEndBranchLength: 87,
        decisionBranchLength: 356,
        deadEndBranchCount: 68,
        decisionBranchCount: 134,
      },
      pathsMetrics: {
        avgTortuosity: 27.5,
        minTortuosity: 25,
        maxTortuosity: 30,
        pathVariance: 0,
        avgTurnDensity: 0.5386847195357833,
        shortestPathTurnDensity: 0.5319148936170213,
      },
      pathOverlapMetrics: {
        repeatedCellCount: 43,
        repeatedOccurrences: 86,
        uniqueCellCount: 16,
      },
    },
  },
  {
    name: "two paths medium ambiguity",
    id: 2,
    algorithm: "three",
    maze: {
      rows: 20,
      cols: 20,
      cells: [
        [
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
        ],
        [
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: false,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: false,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
        ],
        [
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
          },
          {
            visited: false,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: false,
            walls: {
              north: true,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
        ],
        [
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
        ],
        [
          {
            visited: false,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: false,
            walls: {
              north: false,
              east: true,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
            loopReason: "branchDistance",
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: false,
            walls: {
              north: true,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: false,
            },
          },
        ],
        [
          {
            visited: false,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: false,
            walls: {
              north: true,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
            loopReason: "branchDistance",
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: false,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
        ],
        [
          {
            visited: false,
            walls: {
              north: false,
              east: true,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: false,
            walls: {
              north: true,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
        ],
        [
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
        ],
        [
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
        ],
        [
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
        ],
        [
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
        ],
        [
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
        ],
        [
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: false,
            },
          },
        ],
        [
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
        ],
        [
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: false,
            walls: {
              north: true,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: true,
            },
          },
        ],
        [
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
        ],
        [
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: false,
            walls: {
              north: false,
              east: true,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: true,
            },
            startPoint: true,
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
          },
        ],
        [
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: false,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: false,
            },
            isHead: true,
          },
        ],
        [
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: false,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: false,
              west: false,
            },
          },
        ],
        [
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: false,
              south: true,
              west: true,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: false,
            },
            isHead: true,
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
          },
          {
            visited: true,
            walls: {
              north: true,
              east: false,
              south: true,
              west: true,
            },
          },
          {
            visited: true,
            walls: {
              north: false,
              east: true,
              south: true,
              west: false,
            },
            isHead: true,
          },
        ],
      ],
    },
    paths: [
      [
        {
          row: 0,
          col: 0,
        },
        {
          row: 1,
          col: 0,
        },
        {
          row: 2,
          col: 0,
        },
        {
          row: 3,
          col: 0,
        },
        {
          row: 3,
          col: 1,
        },
        {
          row: 2,
          col: 1,
        },
        {
          row: 2,
          col: 2,
        },
        {
          row: 1,
          col: 2,
        },
        {
          row: 1,
          col: 3,
        },
        {
          row: 2,
          col: 3,
        },
        {
          row: 2,
          col: 4,
        },
        {
          row: 1,
          col: 4,
        },
        {
          row: 0,
          col: 4,
        },
        {
          row: 0,
          col: 5,
        },
        {
          row: 0,
          col: 6,
        },
        {
          row: 1,
          col: 6,
        },
        {
          row: 1,
          col: 7,
        },
        {
          row: 0,
          col: 7,
        },
        {
          row: 0,
          col: 8,
        },
        {
          row: 0,
          col: 9,
        },
        {
          row: 0,
          col: 10,
        },
        {
          row: 1,
          col: 10,
        },
        {
          row: 2,
          col: 10,
        },
        {
          row: 3,
          col: 10,
        },
        {
          row: 3,
          col: 11,
        },
        {
          row: 4,
          col: 11,
        },
        {
          row: 4,
          col: 10,
        },
        {
          row: 4,
          col: 9,
        },
        {
          row: 3,
          col: 9,
        },
        {
          row: 3,
          col: 8,
        },
        {
          row: 4,
          col: 8,
        },
        {
          row: 5,
          col: 8,
        },
        {
          row: 5,
          col: 7,
        },
        {
          row: 6,
          col: 7,
        },
        {
          row: 6,
          col: 8,
        },
        {
          row: 6,
          col: 9,
        },
        {
          row: 7,
          col: 9,
        },
        {
          row: 8,
          col: 9,
        },
        {
          row: 9,
          col: 9,
        },
        {
          row: 9,
          col: 8,
        },
        {
          row: 9,
          col: 7,
        },
        {
          row: 9,
          col: 6,
        },
        {
          row: 10,
          col: 6,
        },
        {
          row: 10,
          col: 7,
        },
        {
          row: 11,
          col: 7,
        },
        {
          row: 11,
          col: 8,
        },
        {
          row: 11,
          col: 9,
        },
        {
          row: 12,
          col: 9,
        },
        {
          row: 12,
          col: 8,
        },
        {
          row: 12,
          col: 7,
        },
        {
          row: 12,
          col: 6,
        },
        {
          row: 12,
          col: 5,
        },
        {
          row: 13,
          col: 5,
        },
        {
          row: 13,
          col: 6,
        },
        {
          row: 14,
          col: 6,
        },
        {
          row: 14,
          col: 7,
        },
        {
          row: 13,
          col: 7,
        },
        {
          row: 13,
          col: 8,
        },
        {
          row: 13,
          col: 9,
        },
        {
          row: 13,
          col: 10,
        },
        {
          row: 13,
          col: 11,
        },
        {
          row: 14,
          col: 11,
        },
        {
          row: 14,
          col: 10,
        },
        {
          row: 14,
          col: 9,
        },
        {
          row: 14,
          col: 8,
        },
        {
          row: 15,
          col: 8,
        },
        {
          row: 15,
          col: 7,
        },
        {
          row: 16,
          col: 7,
        },
        {
          row: 17,
          col: 7,
        },
        {
          row: 17,
          col: 8,
        },
        {
          row: 18,
          col: 8,
        },
        {
          row: 19,
          col: 8,
        },
        {
          row: 19,
          col: 9,
        },
        {
          row: 19,
          col: 10,
        },
        {
          row: 18,
          col: 10,
        },
        {
          row: 18,
          col: 11,
        },
        {
          row: 19,
          col: 11,
        },
        {
          row: 19,
          col: 12,
        },
        {
          row: 19,
          col: 13,
        },
        {
          row: 19,
          col: 14,
        },
        {
          row: 19,
          col: 15,
        },
        {
          row: 19,
          col: 16,
        },
        {
          row: 19,
          col: 17,
        },
        {
          row: 18,
          col: 17,
        },
        {
          row: 18,
          col: 18,
        },
        {
          row: 18,
          col: 19,
        },
        {
          row: 19,
          col: 19,
        },
      ],
      [
        {
          row: 0,
          col: 0,
        },
        {
          row: 1,
          col: 0,
        },
        {
          row: 2,
          col: 0,
        },
        {
          row: 3,
          col: 0,
        },
        {
          row: 3,
          col: 1,
        },
        {
          row: 2,
          col: 1,
        },
        {
          row: 2,
          col: 2,
        },
        {
          row: 1,
          col: 2,
        },
        {
          row: 1,
          col: 3,
        },
        {
          row: 2,
          col: 3,
        },
        {
          row: 2,
          col: 4,
        },
        {
          row: 1,
          col: 4,
        },
        {
          row: 0,
          col: 4,
        },
        {
          row: 0,
          col: 5,
        },
        {
          row: 0,
          col: 6,
        },
        {
          row: 1,
          col: 6,
        },
        {
          row: 1,
          col: 7,
        },
        {
          row: 0,
          col: 7,
        },
        {
          row: 0,
          col: 8,
        },
        {
          row: 0,
          col: 9,
        },
        {
          row: 0,
          col: 10,
        },
        {
          row: 1,
          col: 10,
        },
        {
          row: 2,
          col: 10,
        },
        {
          row: 3,
          col: 10,
        },
        {
          row: 3,
          col: 11,
        },
        {
          row: 4,
          col: 11,
        },
        {
          row: 4,
          col: 10,
        },
        {
          row: 4,
          col: 9,
        },
        {
          row: 3,
          col: 9,
        },
        {
          row: 3,
          col: 8,
        },
        {
          row: 4,
          col: 8,
        },
        {
          row: 4,
          col: 7,
        },
        {
          row: 3,
          col: 7,
        },
        {
          row: 2,
          col: 7,
        },
        {
          row: 2,
          col: 6,
        },
        {
          row: 3,
          col: 6,
        },
        {
          row: 3,
          col: 5,
        },
        {
          row: 4,
          col: 5,
        },
        {
          row: 5,
          col: 5,
        },
        {
          row: 6,
          col: 5,
        },
        {
          row: 6,
          col: 6,
        },
        {
          row: 7,
          col: 6,
        },
        {
          row: 8,
          col: 6,
        },
        {
          row: 8,
          col: 5,
        },
        {
          row: 7,
          col: 5,
        },
        {
          row: 7,
          col: 4,
        },
        {
          row: 7,
          col: 3,
        },
        {
          row: 6,
          col: 3,
        },
        {
          row: 6,
          col: 4,
        },
        {
          row: 5,
          col: 4,
        },
        {
          row: 4,
          col: 4,
        },
        {
          row: 4,
          col: 3,
        },
        {
          row: 4,
          col: 2,
        },
        {
          row: 5,
          col: 2,
        },
        {
          row: 6,
          col: 2,
        },
        {
          row: 6,
          col: 1,
        },
        {
          row: 7,
          col: 1,
        },
        {
          row: 7,
          col: 0,
        },
        {
          row: 8,
          col: 0,
        },
        {
          row: 9,
          col: 0,
        },
        {
          row: 10,
          col: 0,
        },
        {
          row: 11,
          col: 0,
        },
        {
          row: 11,
          col: 1,
        },
        {
          row: 11,
          col: 2,
        },
        {
          row: 10,
          col: 2,
        },
        {
          row: 10,
          col: 1,
        },
        {
          row: 9,
          col: 1,
        },
        {
          row: 9,
          col: 2,
        },
        {
          row: 9,
          col: 3,
        },
        {
          row: 10,
          col: 3,
        },
        {
          row: 11,
          col: 3,
        },
        {
          row: 11,
          col: 4,
        },
        {
          row: 10,
          col: 4,
        },
        {
          row: 10,
          col: 5,
        },
        {
          row: 11,
          col: 5,
        },
        {
          row: 11,
          col: 6,
        },
        {
          row: 12,
          col: 6,
        },
        {
          row: 12,
          col: 5,
        },
        {
          row: 13,
          col: 5,
        },
        {
          row: 13,
          col: 6,
        },
        {
          row: 14,
          col: 6,
        },
        {
          row: 14,
          col: 7,
        },
        {
          row: 13,
          col: 7,
        },
        {
          row: 13,
          col: 8,
        },
        {
          row: 13,
          col: 9,
        },
        {
          row: 13,
          col: 10,
        },
        {
          row: 13,
          col: 11,
        },
        {
          row: 14,
          col: 11,
        },
        {
          row: 14,
          col: 10,
        },
        {
          row: 14,
          col: 9,
        },
        {
          row: 14,
          col: 8,
        },
        {
          row: 15,
          col: 8,
        },
        {
          row: 15,
          col: 7,
        },
        {
          row: 16,
          col: 7,
        },
        {
          row: 17,
          col: 7,
        },
        {
          row: 17,
          col: 8,
        },
        {
          row: 18,
          col: 8,
        },
        {
          row: 19,
          col: 8,
        },
        {
          row: 19,
          col: 9,
        },
        {
          row: 19,
          col: 10,
        },
        {
          row: 18,
          col: 10,
        },
        {
          row: 18,
          col: 11,
        },
        {
          row: 19,
          col: 11,
        },
        {
          row: 19,
          col: 12,
        },
        {
          row: 19,
          col: 13,
        },
        {
          row: 19,
          col: 14,
        },
        {
          row: 19,
          col: 15,
        },
        {
          row: 19,
          col: 16,
        },
        {
          row: 19,
          col: 17,
        },
        {
          row: 18,
          col: 17,
        },
        {
          row: 18,
          col: 18,
        },
        {
          row: 18,
          col: 19,
        },
        {
          row: 19,
          col: 19,
        },
      ],
    ],
    metrics: {
      totalIntersections: 62,
      totalPaths: 2,
      shortestPathLength: 86,
      mazeDifficultyFeatures: {
        decisionPenalty: 248,
        ambiguity: 124,
        tortuosity: 222,
        deadEndBranchLength: 74,
        decisionBranchLength: 404,
        deadEndBranchCount: 62,
        decisionBranchCount: 124,
      },
      pathsMetrics: {
        avgTortuosity: 63,
        minTortuosity: 52,
        maxTortuosity: 74,
        pathVariance: 0,
        avgTurnDensity: 0.6262842030312278,
        shortestPathTurnDensity: 0.5977011494252874,
      },
      pathOverlapMetrics: {
        repeatedCellCount: 68,
        repeatedOccurrences: 136,
        uniqueCellCount: 64,
      },
    },
  },
];
