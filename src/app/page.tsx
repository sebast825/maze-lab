"use client";

import { MazeCanvas } from "@/features/maze/mazeCanvas";
import { useMazeGenerator } from "@/features/maze/useMazeGenerator";

export default function Home() {
  const { mazeData, createMaze } = useMazeGenerator();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-slate-900 font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-slate-900 sm:items-start">
        <div>
          <button
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            onClick={createMaze}
          >
            Generate
          </button>
          
          {mazeData && mazeData.end && (
            <MazeCanvas maze={mazeData.maze} start={mazeData.start} end={mazeData.end!} cellSize={25} path={mazeData.solution || undefined} />
          )}
        </div>
      </main>
    </div>
  );
}
