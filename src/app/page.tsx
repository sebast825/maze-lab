"use client";

import { DrawingCanvas, DrawingCanvasRef } from "@/features/maze/drawingCanvas";
import { CharacterCanvas } from "@/features/maze/characterCanvas";
import { MazeCanvas } from "@/features/maze/mazeCanvas";
import { useCanvasPDF } from "@/features/maze/useCanvasPDF";
import { useMazeGenerator } from "@/features/maze/useMazeGenerator";
import { AlgorithmType } from "@/lib/alogirthms/generation";
import { useState, useRef, useEffect } from "react";
import { ToolBar } from "@/components/toolBar";
import { Actions, Controls, Modes } from "@/features/maze/menu";
import { ActionButton } from "@/components/actionButton";
import { useMazeMetrics } from "@/features/maze/useMazeMetrics";

import { defaultWeights } from "@/lib/maze/metrics/scoring/defaultWeights";
import { analyzeMaze } from "@/lib/maze/metrics/scoring/scoring";
import benchmark20x20 from "@/lib/maze/benchmark/rawData/manual/20x20.json";
import { MazeBenchmark } from "@/lib/maze/benchmark/types";
import { getClosestSizeKey } from "@/lib/maze/metrics/normalize/mazeSizeSpecs";

export type GameMode = "VIEW" | "DRAW" | "CHARACTER";

export default function Home() {
  const [algorithm, setAlgorithm] = useState<AlgorithmType>("three");
  const [rows, setRows] = useState<number>(20);
  const [cols, setCols] = useState<number>(20);

  const [showPath, setShowPath] = useState<boolean>(false);
  const { mazeData, createMaze } = useMazeGenerator();
  const { metrics, calculateMetrics } = useMazeMetrics();

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
    handleClearDraw();
    setShowPath(false);
  };
  useEffect(() => {
    if (!metrics || !mazeData) return;
    const rawData: MazeBenchmark = {
      name: "",
      id: benchmark20x20.length + 1,
      algorithm,
      maze: mazeData?.maze!,
      paths: mazeData?.solution!,
      metrics: metrics.raw,
    };
    console.log("raw data: ", rawData);
    console.log(
      "metrics, raw, derived ,weights and scores: ",
      analyzeMaze(
        metrics.raw,
        defaultWeights,
        getClosestSizeKey(rawData.maze.rows * rawData.maze.cols),
      ),
    );
  }, [metrics]);

  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center bg-slate-950 font-sans md:max-h-[100vh]  px-4">
      {/* 1. Changed max-w-3xl to max-w-full/w-full and aligned children to center */}
      <main className="flex flex-col flex-1 w-full max-w-full items-center justify-between  my-10">
        {/* 2. Added centering to the direct wrapper container */}
        <div className="flex flex-col items-center w-full">
          {/* 3. Restricted menu to a readable reading width so it doesn't split apart */}
          <div className="w-full max-w-3xl mb-6">
            <ToolBar>
              <Controls
                algorithm={algorithm}
                onAlgorithmChange={setAlgorithm}
                rows={rows}
                onRowsChange={setRows}
                cols={cols}
                onColsChange={setCols}
                onGenerate={handleGenerate}
              />
              <Actions
                generateMaze={handleGenerate}
                onShowPath={() => setShowPath(!showPath)}
                showPath={showPath}
                exportToPDF={() => handleExportToPDF(mazeData!, cols)}
                disableExportToPDF={!mazeData}
              />

              {mazeData && (
                <>
                  <Modes
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
                  <ActionButton
                    color="red"
                    action={() => {
                      calculateMetrics(mazeData);
                    }}
                  >
                    Benchmark Data
                  </ActionButton>
                </>
              )}
            </ToolBar>
          </div>
          <div className="relative w-full  overflow-auto border border-black rounded bg-slate-950 ">
            <div className="grid min-h-full min-w-full place-items-center">
              <div className="w-fit relative min-h-full">
                {mazeData && mazeData.end && (
                  <MazeCanvas
                    mazeData={mazeData}
                    cellSize={CELL_SIZE}
                    showPath={showPath}
                  />
                )}
                {gameMode == "CHARACTER" && mazeData && (
                  <CharacterCanvas mazeData={mazeData!} cellSize={CELL_SIZE} />
                )}
                {gameMode == "DRAW" && (
                  <DrawingCanvas
                    cols={cols}
                    rows={rows}
                    cellSize={CELL_SIZE}
                    ref={drawingRef}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
