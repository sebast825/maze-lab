"use client";

import { useEffect, useState, forwardRef } from "react";
import { MazeCanvas } from "./mazeCanvas";
import { CharacterCanvas } from "./characterCanvas/characterCanvas";
import { DrawingCanvas, DrawingCanvasRef } from "./drawingCanvas/drawingCanvas";
import { MazeData } from "@/lib/maze/types";
import { useCellSize } from "../hooks/useCellSize";

export type ViewerGameMode = "VIEW" | "DRAW" | "CHARACTER";

interface MazeViewerProps {
    mazeData: MazeData;
    gameMode: ViewerGameMode | string;
    showPath: boolean;
    children?: React.ReactNode;

}

export const MazeViewer = forwardRef<DrawingCanvasRef, MazeViewerProps>(
    ({ mazeData, gameMode, showPath = false, children }, ref) => {
        {
            const { rows, cols } = mazeData.maze;
            const cellSize = useCellSize({rows, cols})
        

            const isDrawMode = gameMode === "DRAW";
            const isCharacterMode = gameMode === "CHARACTER";
            return (
                <div className="relative w-full overflow-auto md:overflow-hidden border border-black rounded h-full">
                    <div className="grid min-h-full min-w-full place-items-center">
                        <div className="w-fit relative min-h-full grid place-items-center">
                            <div
                                className={`relative transition-all duration-300 ${gameMode != "VIEW"
                                    ? "ring-2 bg-[#000] ring-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                                    : "ring-0"
                                    }`}
                            >
                                {mazeData.end && (
                                    <MazeCanvas
                                        mazeData={mazeData}
                                        cellSize={cellSize}
                                        showPath={showPath}
                                    />
                                )}

                                {isCharacterMode && (
                                    <CharacterCanvas
                                        mazeData={mazeData}
                                        cellSize={cellSize}
                                    />
                                )}
                                {isDrawMode && (
                                    <DrawingCanvas
                                        cols={cols}
                                        rows={rows}
                                        cellSize={cellSize}
                                        ref={ref}

                                    />
                                )}
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
)