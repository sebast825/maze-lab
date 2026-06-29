"use client";

import { useMazeAnalysis } from "@/features/mazeAnalysis/useMazeAnalysis";
import { useEffect, useRef, useState } from "react";
import { DrawingCanvasRef } from "@/features/maze/drawingCanvas";
import { ActionButton } from "@/components/actionButton";
import { ToolBar } from "@/components/toolBar";
import { BenchmarkSelector } from "./components/benchmarkSelector";
import { DrawMode } from "./components/drawMode";
import { AnalysisMode } from "./types";
import { useScoreWeights } from "./useScoreWeights";
import { ScoreWeightsPanel } from "./components/scoreWeightsPanel";
import { MazeAnalysisPanel } from "./components/mazeAnalysisPanel/mazeAnalysisPanel";
import { getBenchmarkMetricsRows } from "@/lib/infrastructure/benchmark/helpers";
import { MazeBenchmark } from "@/lib/infrastructure/benchmark/types";
import { getMetricStats } from "@/lib/infrastructure/benchmark/metricStats/getMetrics";
import { Footer } from "@/components/footer";
import { RawDataSize, rawDataManualSelector } from "@/lib/infrastructure/benchmark/rawData/manual";
import { MazeViewer } from "@/features/maze/mazeViewer";

export function MazeAnalysis() {
  const [selectedId, setSelectedId] = useState<number | string>("");
  const [gameMode, setGameMode] = useState<AnalysisMode>("DRAW");
  const [showPath, setShowPath] = useState<boolean>(true);
  const { weights, setWeights, resetWeights } = useScoreWeights();
  const { mazeData, createMaze, mazeScoreResult } = useMazeAnalysis(weights);
  const [size, setSize] = useState<RawDataSize>("30*30");
  const drawingRef = useRef<DrawingCanvasRef | null>(null);
  const handleUndoDraw = () => {
    drawingRef.current?.undo();
  };
  const handleClearDraw = () => {
    drawingRef.current?.clear();
  };


  useEffect(() => {
    if (selectedId == "") return;
    const getMazeRawData: MazeBenchmark | undefined = rawDataManualSelector[
      size
    ].find((e) => e.id == selectedId);
    if (!getMazeRawData) return;
    createMaze(getMazeRawData);
  }, [selectedId]);

  const generateMetricsReport = () => {
    const rows = getBenchmarkMetricsRows(rawDataManualSelector[size]);
    console.log("For maze with size: ", size);

    console.table(rows);
    console.table(getMetricStats(rows));
  };
  return (
    <>
      <div className="flex flex-col min-h-screen w-full items-center justify-center bg-slate-950 font-sans   px-4">
        {/* 1. Changed max-w-3xl to max-w-full/w-full and aligned children to center */}
        <main className="flex flex-col flex-1 w-full max-w-full items-center justify-between  my-10">
          {/* 2. Added centering to the direct wrapper container */}
          <div className="flex flex-col items-center w-full gap-5">
            {/* 3. Restricted menu to a readable reading width so it doesn't split apart */}
            <div className="w-fit  mb-6 ">
              <ToolBar>
                <div className="flex  sm:flex-row flex-col gap-4">
                  <BenchmarkSelector
                    size={size}
                    onSizeChange={(e) => setSize(e)}
                    selectedId={selectedId}
                    benchmarks={rawDataManualSelector[size]}
                    onChange={(e) => setSelectedId(e)}
                  ></BenchmarkSelector>
                  <div className="flex flex-row gap-4">
                    {mazeData && (
                      <ActionButton
                        variant="outline"
                        onClick={() => setShowPath(!showPath)}
                        color={"purple"}
                      >{showPath ? "Hide Path" : "Show Path"}</ActionButton>
                    )}

                    {mazeData && (
                      <>
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
                        ></DrawMode></>
                    )}
                  </div>
                  {size && (
                    <ActionButton
                      variant="outline"
                      onClick={() => generateMetricsReport()}
                      color={"blue"}
                    >
                      Log metrics
                    </ActionButton>
                  )}
                </div>
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
            {
              mazeData && <MazeViewer mazeData={mazeData} showPath={showPath} gameMode={gameMode} ref={drawingRef}
              ></MazeViewer>
            }
          </div>
        </main>
        <Footer></Footer>
      </div>
    </>
  );
}
