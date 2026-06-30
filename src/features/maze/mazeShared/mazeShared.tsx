"use client";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navBar";
import { MazeData } from "@/lib/maze/types";
import { useState, useRef, useEffect } from "react";
import { DrawingCanvasRef } from "../components/drawingCanvas/drawingCanvas";
import { MazeViewer } from "../components/mazeViewer";
import { useCanvasPDF } from "../hooks/useCanvasPDF";
import { useMazeMetrics } from "../hooks/useMazeMetrics";
import { GameMode } from "../types";
import { decodeMaze } from "@/lib/maze/serialization/decode";
import { findAllPaths } from "@/lib/algorithms/solving/dfs";
import { DesktopMenu } from "./components/navBar/desktopMenu";
import { MobileMenu } from "./components/navBar/mobileMenu";

interface MazeSharedProps {
    encodedData: string
}
export default function MazeShared({ encodedData }: MazeSharedProps) {

    const [showPath, setShowPath] = useState<boolean>(false);
    const [mazeData, setMazeData] = useState<MazeData | null>(null)
    const { metrics, calculateMetrics } = useMazeMetrics();

    const { handleExportToPDF } = useCanvasPDF();

    const [gameMode, setGameMode] = useState<GameMode>("VIEW");

    const drawingRef = useRef<DrawingCanvasRef | null>(null);

    const handleUndoDraw = () => {
        drawingRef.current?.undo();
    };
    const handleClearDraw = () => {
        drawingRef.current?.clear();
    };

    useEffect(() => {
        const mazeData: MazeData = decodeMaze(encodedData);
        const solution = findAllPaths(mazeData.maze, mazeData.start, mazeData.end);
        mazeData.solution = solution;
        calculateMetrics(mazeData);
        setMazeData(mazeData)

    }, [])

    const menuProps = {
        cols: mazeData?.maze.cols!,
        total: metrics?.scores.total,
        showPath,
        setShowPath,
        handleExportToPDF,
        mazeData,
        gameMode,
        setGameMode: (e: GameMode) => setGameMode(e),
        handleUndoDraw,
        handleClearDraw,
    };
    return (
        <div className="flex flex-col min-h-screen w-full items-center justify-center bg-slate-950 font-sans md:max-h-[100vh]  px-4 h-full">
            {/* 1. Changed max-w-3xl to max-w-full/w-full and aligned children to center */}
            <main className="flex flex-col flex-1 w-full max-w-full items-center justify-between  h-full">
                {/* 2. Added centering to the direct wrapper container */}
                <div className="flex flex-col items-center w-full h-screen ">
                    {/* 3. Restricted menu to a readable reading width so it doesn't split apart */}
                    <Navbar total={metrics?.scores.total} desktopMenu={<DesktopMenu {...menuProps} />} mobileMenu={<MobileMenu {...menuProps} />} />


                    {mazeData && <MazeViewer mazeData={mazeData} gameMode={gameMode} showPath={showPath} ref={drawingRef}></MazeViewer>}

                    <Footer></Footer>
                </div>
            </main>
        </div>
    );
}
