"use client";

import { useMazeAnalysis } from "@/features/mazeAnalysis/useMazeAnalysis";
import { benchmark20x20 } from "@/features/mazeAnalysis/benchmarkData/rawData/benchmark20x20";
import { useEffect, useRef, useState } from "react";
import { MazeCanvas } from "@/features/maze/mazeCanvas";
import { DrawingCanvas, DrawingCanvasRef } from "@/features/maze/drawingCanvas";
import { MazeBenchmark } from "@/features/mazeAnalysis/benchmarkData/types";
import { ActionButton } from "@/components/actionButton";
import { ToolBar } from "@/components/toolBar";
import { BenchmarkSelector } from "./benchmarkSelector";
import { DrawMode } from "./drawMode";
import { AnalysisMode } from "../types";
import { useScoreWeights } from "../useScoreWeights";
import { ScoreWeightsPanel } from "./scoreWeightsPanel";
import { MazeAnalysisPanel } from "./mazeAnalysisPanel/mazeAnalysisPanel";

export function MazeAnalysis() {
  const [selectedId, setSelectedId] = useState<number | string>("");
  const drawingRef = useRef<DrawingCanvasRef | null>(null);
  const CELL_SIZE = 20;
  const [gameMode, setGameMode] = useState<AnalysisMode>("DRAW");
  const [showPath, setShowPath] = useState<boolean>(true);
  const { weights, setWeights, resetWeights } = useScoreWeights();
  const { mazeData, createMaze, mazeScoreResult } = useMazeAnalysis(weights);

  const handleUndoDraw = () => {
    drawingRef.current?.undo();
  };
  const handleClearDraw = () => {
    drawingRef.current?.clear();
  };

  useEffect(() => {
    if (selectedId == "") return;
    const getMazeRawData: MazeBenchmark | undefined = benchmark20x20.find(
      (e) => e.id == selectedId,
    );
    if (!getMazeRawData) return;
    createMaze(getMazeRawData);
  }, [selectedId]);

  return (
    <>
      <div className="flex flex-col min-h-screen w-full items-center justify-center bg-slate-950 font-sans   px-4">
        {/* 1. Changed max-w-3xl to max-w-full/w-full and aligned children to center */}
        <main className="flex flex-col flex-1 w-full max-w-full items-center justify-between  my-10">
          {/* 2. Added centering to the direct wrapper container */}
          <div className="flex flex-col items-center w-full gap-5">
            {/* 3. Restricted menu to a readable reading width so it doesn't split apart */}
            <div className="w-full max-w-3xl mb-6">
              <ToolBar>
                <BenchmarkSelector
                  selectedId={selectedId}
                  benchmarks={benchmark20x20}
                  onChange={(e) => setSelectedId(e)}
                ></BenchmarkSelector>
                {mazeData && (
                  <ActionButton
                    action={() => setShowPath(!showPath)}
                    text={showPath ? "Hide Path" : "Show Path"}
                    color="purple"
                  />
                )}

                {mazeData && (
                  <DrawMode
                    currentMode={gameMode}
                    toggleDraw={() =>
                      gameMode != "DRAW"
                        ? setGameMode("DRAW")
                        : setGameMode("VIEW")
                    }
                    undoLast={() => handleUndoDraw()}
                    clearAll={() => handleClearDraw()}
                    drawCanvas={gameMode == "DRAW"}
                  ></DrawMode>
                )}
              </ToolBar>
            </div>
            {/* Mazes */}
            <div className="flex flex-col xl:flex-row items-center xl:items-start justify-center gap-5 w-full  ">
              

              <ScoreWeightsPanel
                weights={weights}
                onApply={setWeights}
                onResset={resetWeights}
              />
                {mazeScoreResult && (
              <MazeAnalysisPanel data={mazeScoreResult}></MazeAnalysisPanel>
            )}
            </div>
            {mazeData && (
                <div className="w-full lg:w-auto">
                  <div className="relative overflow-auto border border-black rounded bg-slate-950">
                    <div className="grid min-h-full min-w-full place-items-center">
                      <div className="w-fit relative min-h-full">
                        {mazeData.end && (
                          <MazeCanvas
                            mazeData={mazeData}
                            cellSize={CELL_SIZE}
                            showPath={showPath}
                          />
                        )}

                        {gameMode === "DRAW" && (
                          <DrawingCanvas
                            cols={mazeData.maze.cols}
                            rows={mazeData.maze.rows}
                            cellSize={CELL_SIZE}
                            ref={drawingRef}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
          
          </div>
        </main>
      </div>
    </>
  );
}
