"use client";

import { MazeCanvas } from "@/components/maze/mazeCanvas";
import { createMazeSizeDFS,handleMazeGenerationDFS } from "@/lib/alogirthms/generation/dfs";
import { Maze } from "@/lib/maze/types";
import { useState } from "react";

export default function Home() {
  const [maze, setMaze] = useState<Maze | null>(null);

  // Generar laberinto
  const handleGenerate = () => {
    const newMaze : Maze = handleMazeGenerationDFS(createMazeSizeDFS(20, 20));
    setMaze(newMaze);
  };
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-slate-900 font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-slate-900 sm:items-start">
        <div className="">
          <button
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleGenerate}
          >
            Generar
          </button>
          {maze && <MazeCanvas maze={maze} cellSize={25} />}
        </div>
      </main>
    </div>
  );
}
