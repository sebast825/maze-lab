"use client";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navBar";
import { useState, useRef, useEffect } from "react";
import { DrawingCanvasRef } from "../components/drawingCanvas/drawingCanvas";
import { MazeViewer } from "../components/mazeViewer";
import { useCanvasPDF } from "../hooks/useCanvasPDF";
import { GameMode } from "../types";
import { MazeOverlay } from "./components/mazeOverlay";
import { useCellSize } from "../hooks/useCellSize";
import { MazeSharedError } from "../mazeShared/components/mazeSharedError";
import { useMazeEditor } from "./useMazeEditor";
import { ToolBar } from "./components/toolBar";



interface MazeEditorProps {
    encodedData: string
}
export default function MazeEditor({ encodedData }: MazeEditorProps) {

    const [showPath, setShowPath] = useState<boolean>(true);

    const { mazeData,
        metrics,
        error,
        handleWallClick,
        canUndo,
        canRedo,
        handleRedo,
        handleUndo } = useMazeEditor({ encodedData })
    const cellSize = useCellSize({ rows: mazeData?.maze.rows!, cols: mazeData?.maze.cols! })

    const { handleExportToPDF } = useCanvasPDF();

    const [gameMode, setGameMode] = useState<GameMode>("VIEW");

    const drawingRef = useRef<DrawingCanvasRef | null>(null);


    useEffect(() => { }, [mazeData])

    const menuProps = {
        cols: mazeData?.maze.cols!,
        total: metrics?.scores.total,
        showPath,
        setShowPath,
        handleExportToPDF,
        mazeData,
        gameMode,
        setGameMode: (e: GameMode) => setGameMode(e),
        handleUndo,
        handleRedo,
        canUndo,
        canRedo
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

                    <Navbar total={metrics?.scores.total} desktopMenu={<ToolBar {...menuProps} />} mobileMenu={<ToolBar {...menuProps} />} />
                    {mazeData &&

                        <MazeViewer mazeData={mazeData} gameMode={gameMode} showPath={showPath} ref={drawingRef}>
                            <MazeOverlay rows={mazeData.maze.rows} cols={mazeData.maze.cols} cellSize={cellSize}
                                onCellClick={(cellA, cellB) => { handleWallClick(cellA, cellB) }}>
                            </MazeOverlay>
                        </MazeViewer>
                    }
                    <Footer/>
                </div>
            </main>
        </div>
    );
}
