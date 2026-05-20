"use client";

import { DrawingCanvas, DrawingCanvasRef } from "@/features/maze/drawingCanvas";
import { CharacterCanvas } from "@/features/maze/characterCanvas";
import { MazeCanvas } from "@/features/maze/mazeCanvas";
import { Menu } from "@/features/maze/menu";
import { useCanvasPDF } from "@/features/maze/useCanvasPDF";
import { useMazeGenerator } from "@/features/maze/useMazeGenerator";
import { AlgorithmType } from "@/lib/alogirthms/generation";
import { useState, useRef } from "react";

export type GameMode = "VIEW" | "DRAW" | "CHARACTER";

export default function Home() {
  const [algorithm, setAlgorithm] = useState<AlgorithmType>("worms");
  const [rows, setRows] = useState<number>(20);
  const [cols, setCols] = useState<number>(20);

  const [showPath, setShowPath] = useState<boolean>(false);
  const { mazeData, createMaze } = useMazeGenerator();

  const { handleExportToPDF } = useCanvasPDF();

  const [gameMode, setGameMode] = useState<GameMode>("DRAW");

  const drawingRef = useRef<DrawingCanvasRef | null>(null);

  // Absolute constant sizing configuration for grid rendering units
  const CELL_SIZE = 25;

  const handleUndoDraw = () => {
    drawingRef.current?.undo();
  };
  const handleClearDraw = () => {
    drawingRef.current?.clear();
  };

  const handleGenerate = () => {
    createMaze(algorithm, rows, cols);
    setShowPath(false);
  };

  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center bg-slate-950 font-sans">
      {/* 1. Changed max-w-3xl to max-w-full/w-full and aligned children to center */}
      <main className="flex flex-col flex-1 w-full max-w-full items-center justify-between py-16 px-4 ">
        {/* 2. Added centering to the direct wrapper container */}
        <div className="flex flex-col items-center w-full">
          {/* 3. Restricted menu to a readable reading width so it doesn't split apart */}
          <div className="w-full max-w-3xl mb-6">
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
                showPath={showPath}
                exportToPDF={() => handleExportToPDF(mazeData!, cols)}
                disableExportToPDF={!mazeData}
              />

              {mazeData && (
                <Menu.Modes
                  currentMode={gameMode}
                  toggleCharacter={() =>
                    gameMode != "CHARACTER"
                      ? setGameMode("CHARACTER")
                      : setGameMode("VIEW")
                  }
                  toggleDraw={() =>
                    gameMode != "DRAW"
                      ? setGameMode("DRAW")
                      : setGameMode("VIEW")
                  }
                  undoLast={() => handleUndoDraw()}
                  clearAll={() => handleClearDraw()}
                  drawCanvas={gameMode == "DRAW"}
                />
              )}
            </Menu>
          </div>
          <div className="relative w-full h-auto max-w-[100vw] max-h-[70vh] overflow-auto border border-black rounded bg-slate-950 ">
            <div className="flex min-w-full min-h-full items-center justify-center  ">
              <div className="relative inline-block">
                {mazeData && mazeData.end && (
                  <MazeCanvas
                    mazeData={mazeData}
                    cellSize={CELL_SIZE}
                    showPath={showPath}
                  />
                )}
                {gameMode == "CHARACTER" && mazeData && (
                  <CharacterCanvas mazeData={mazeData!} cellSize={25} />
                )}
                {gameMode == "DRAW" && (
                  <DrawingCanvas cols={cols} rows={rows} ref={drawingRef} />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
