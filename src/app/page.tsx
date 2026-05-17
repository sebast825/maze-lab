"use client";

import { MazeCanvas } from "@/features/maze/mazeCanvas";
import { Menu } from "@/features/maze/menu";
import { useCanvasPDF } from "@/features/maze/useCanvasPDF";
import { useMazeGenerator } from "@/features/maze/useMazeGenerator";
import { AlgorithmType } from "@/lib/alogirthms/generation";
import { useState } from "react";

export default function Home() {
  const [algorithm, setAlgorithm] = useState<AlgorithmType>("dfs");
  const [rows, setRows] = useState(20);
  const [cols, setCols] = useState(20);
  const [showPath, setShowPath] = useState<boolean>(false);
  const { mazeData, createMaze } = useMazeGenerator();
  const { exportToPDF, setCanvasElement, hasCanvas } = useCanvasPDF();

  const handleGenerate = () => {
    createMaze(algorithm, rows, cols);
    setShowPath(false);
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-slate-900 font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-slate-900 sm:items-start">
        <div>
          <Menu>
            <Menu.Controls
              algorithm={algorithm}
              onAlgorithmChange={setAlgorithm}
              rows={rows}
              onRowsChange={setRows}
              cols={cols}
              onColsChange={setCols}
              onGenerate={handleGenerate}
            />
            <Menu.Actions
              generateMaze={handleGenerate}
              onShowPath={() => setShowPath(!showPath)}
              showPath = {showPath}
              exportToPDF={() => exportToPDF(cols)}
              disableExportToPDF={!hasCanvas}
            />

         
          </Menu>
          {mazeData && mazeData.end && (
            <MazeCanvas
              onCanvasReady={(canvas) => setCanvasElement(canvas)}
              maze={mazeData.maze}
              start={mazeData.start}
              end={mazeData.end!}
              cellSize={25}
              showPath={showPath}
              path={mazeData.solution || undefined}
            />
          )}
        </div>
      </main>
    </div>
  );
}
