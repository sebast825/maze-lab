import { encodeMaze } from "@/lib/maze/serialization/encode";
import { MazeData } from "@/lib/maze/types";

export  const openMazeInEditor = (mazeData: MazeData) => {
    if (typeof window === "undefined" || !mazeData) return;

    const encodedMaze = encodeMaze(mazeData.maze, mazeData.start, mazeData.end);
    const editorUrl = `${window.location.origin}/editor?data=${encodedMaze}`;

    window.open(editorUrl, "_blank");
  };