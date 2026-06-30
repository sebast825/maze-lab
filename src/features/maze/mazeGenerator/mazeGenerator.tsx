"use client";

import { Footer } from "@/components/footer";
import { useSafeDebouncedAction } from "@/hooks/useSafeDebouncedAction";
import { AlgorithmType } from "@/lib/algorithms/generation";
import { MazeBenchmark } from "@/lib/infrastructure/benchmark/types";
import { MazeData } from "@/lib/maze/types";
import { MazeScoringResult, MazeRawMetrics } from "@/lib/metrics/scoring/types";
import { useState, useRef, useEffect } from "react";
import { DrawingCanvasRef } from "../components/drawingCanvas/drawingCanvas";
import { MazeViewer } from "../components/mazeViewer";
import { useCanvasPDF } from "../hooks/useCanvasPDF";
import { useMazeMetrics } from "../hooks/useMazeMetrics";
import { useMazeGenerator } from "./useMazeGenerator";
import { GameMode } from "../types";
import { Navbar } from "@/components/navBar";
import { DesktopMenu } from "./components/navBar/desktopMenu";
import { MobileMenu } from "./components/navBar/mobileMenu";


export default function MazeGenerator() {
  const [algorithm, setAlgorithm] = useState<AlgorithmType>("worms");
  const [rows, setRows] = useState<number>(20);
  const [cols, setCols] = useState<number>(20);

  const [showPath, setShowPath] = useState<boolean>(false);
  const { mazeData, createMaze } = useMazeGenerator();
  const { metrics, calculateMetrics } = useMazeMetrics();

  const { handleExportToPDF } = useCanvasPDF();

  const [gameMode, setGameMode] = useState<GameMode>("VIEW");

  const drawingRef = useRef<DrawingCanvasRef | null>(null);

  const run = useSafeDebouncedAction(500);
  const handleUndoDraw = () => {
    drawingRef.current?.undo();
  };
  const handleClearDraw = () => {
    drawingRef.current?.clear();
  };

  const handleGenerate = () => {
    const maze = createMaze(algorithm, rows, cols);
    handleClearDraw();
    setShowPath(false);

    run(() => {
      //this metrics is necesary to update the metrics inside hook and show difficulty do not coment
      const metrics: MazeScoringResult = calculateMetrics(maze);
      /*    console.log("metrics:", metrics);
      // Build a complete benchmark snapshot of this maze run
      // (raw structure + metadata) for logging and later analysis
       const rawData = buildMazeBenchmark(metrics.raw, maze, algorithm);
      console.log("rawData ready:", rawData);*/
    });
  };

  const buildMazeBenchmark = (
    rawMetrics: MazeRawMetrics,
    mazeData: MazeData,
    algorithm: AlgorithmType,
  ): MazeBenchmark => {
    return {
      name: "",
      id: Date.now(),
      algorithm,
      maze: mazeData.maze,
      paths: mazeData.solution!,
      metrics: rawMetrics,
    };
  };
  useEffect(() => { handleGenerate() }, [algorithm])
  const menuProps = {
    algorithm,
    setAlgorithm,
    rows,
    setRows,
    cols,
    setCols,
    handleGenerate,
    showPath,
    setShowPath,
    handleExportToPDF,
    mazeData,
    gameMode,
    setGameMode: (e: GameMode) => setGameMode(e),
    handleUndoDraw,
    handleClearDraw,
    total: metrics?.scores.total
  };
  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center bg-slate-950 font-sans md:max-h-[100vh]  px-4 h-full">
      {/* 1. Changed max-w-3xl to max-w-full/w-full and aligned children to center */}
      <main className="flex flex-col flex-1 w-full max-w-full items-center justify-between  h-full">
        {/* 2. Added centering to the direct wrapper container */}
        <div className="flex flex-col items-center w-full h-screen ">
          {/* 3. Restricted menu to a readable reading width so it doesn't split apart */}
          <Navbar total={metrics?.scores.total} desktopMenu={<DesktopMenu {...menuProps}
          />} mobileMenu={<MobileMenu {...menuProps}
          />}></Navbar>

          {mazeData && <MazeViewer mazeData={mazeData} gameMode={gameMode} showPath={showPath} ref={drawingRef}></MazeViewer>}

          <Footer></Footer>
        </div>
      </main>
    </div>
  );
}
