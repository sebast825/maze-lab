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
import { DesktopMenu } from "../mazeShared/components/navBar/desktopMenu";
import { MobileMenu } from "../mazeShared/components/navBar/mobileMenu";
import { MazeOverlay } from "./components/mazeOverlay";
import { useCellSize } from "../hooks/useCellSize";
import { MazeSharedError } from "../mazeShared/components/mazeSharedError";



interface MazeEditorProps {
    encodedData: string
}
export default function MazeEditor({ encodedData }: MazeEditorProps) {

    const [showPath, setShowPath] = useState<boolean>(false);
    const [mazeData, setMazeData] = useState<MazeData | null>(null)
    const { metrics, calculateMetrics } = useMazeMetrics();
    const cellSize = useCellSize({ rows: mazeData?.maze.rows!, cols: mazeData?.maze.cols! })

    const { handleExportToPDF } = useCanvasPDF();

    const [gameMode, setGameMode] = useState<GameMode>("VIEW");

    const drawingRef = useRef<DrawingCanvasRef | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleUndoDraw = () => {
        drawingRef.current?.undo();
    };
    const handleClearDraw = () => {
        drawingRef.current?.clear();
    };

    useEffect(() => {
        try {

            const decodedMaze = decodeMaze(encodedData);
            const solution = findAllPaths(
                decodedMaze.maze,
                decodedMaze.start,
                decodedMaze.end,
            );

            decodedMaze.solution = solution;
            calculateMetrics(decodedMaze);

            setMazeData(decodedMaze);
        } catch (error) {
            console.error("Failed to load maze:", error);
            setError("Failed to load maze");
        }
    }, [encodedData]);

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
    if (error) {
        return <MazeSharedError />;
    }
    return (
        <div className="flex flex-col min-h-screen w-full items-center justify-center bg-slate-950 font-sans md:max-h-[100vh]  px-4 h-full">
            {/* 1. Changed max-w-3xl to max-w-full/w-full and aligned children to center */}
            <main className="flex flex-col flex-1 w-full max-w-full items-center justify-between  h-full">
                {/* 2. Added centering to the direct wrapper container */}
                <div className="flex flex-col items-center w-full h-screen ">
                    {/* 3. Restricted menu to a readable reading width so it doesn't split apart */}
                    <Navbar total={metrics?.scores.total} desktopMenu={<DesktopMenu {...menuProps} />} mobileMenu={<MobileMenu {...menuProps} />} />


                    {mazeData && <MazeViewer mazeData={mazeData} gameMode={gameMode} showPath={showPath} ref={drawingRef}>
                        <MazeOverlay rows={mazeData.maze.rows} cols={mazeData.maze.cols} cellSize={cellSize} onCellClick={(e) => { console.log(e) }}></MazeOverlay>
                    </MazeViewer>}

                    <Footer></Footer>
                </div>
            </main>
        </div>
    );
}
