"use client";

import { DrawingCanvas, DrawingCanvasRef } from "@/features/maze/drawingCanvas";
import { MazeCanvas } from "@/features/maze/mazeCanvas";
import { Menu } from "@/features/maze/menu";
import { useCanvasPDF } from "@/features/maze/useCanvasPDF";
import { useMazeGenerator } from "@/features/maze/useMazeGenerator";
import { AlgorithmType } from "@/lib/alogirthms/generation";
import { useState, useRef } from "react";

export type GameMode = "VIEW" | "DRAW" | "CHARACTER";

export default function Home() {
  const [algorithm, setAlgorithm] = useState<AlgorithmType>("dfs");
  const [rows, setRows] = useState<number>(20);
  const [cols, setCols] = useState<number>(20);

  const [showPath, setShowPath] = useState<boolean>(false);
  const { mazeData, createMaze } = useMazeGenerator();

  const { handleExportToPDF } = useCanvasPDF();

  const [gameMode, setGameMode] = useState<GameMode>("DRAW");
  
  const drawingRef = useRef<DrawingCanvasRef | null>(null);
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
                  gameMode != "DRAW" ? setGameMode("DRAW") : setGameMode("VIEW")
                }
                undoLast={() => handleUndoDraw()}
                clearAll={() => handleClearDraw()}
                drawCanvas={gameMode == "DRAW"}
              />
            )}
          </Menu>

          <div className="relative w-max h-max border border-black">
            {mazeData && mazeData.end && (
              <MazeCanvas
                mazeData={mazeData}
                cellSize={25}
                showPath={showPath}
                gameMode={gameMode}
              />
            )}

            {gameMode == "DRAW" && <DrawingCanvas cols={cols} rows={rows} />}
          </div>
        </div>
      </main>
    </div>
  );
}
