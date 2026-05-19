"use client";

import { useImperativeHandle, forwardRef, useRef } from "react";
import { useDraw } from "./useDraw";

interface DrawingCanvasProps {
  cols: number;
  rows: number;
}

export interface DrawingCanvasRef {
  undo: () => void;
  clear: () => void;
}

export const DrawingCanvas = forwardRef<DrawingCanvasRef, DrawingCanvasProps>(
  ({ cols, rows }, ref) => {
    const internalCanvasRef = useRef<HTMLCanvasElement | null>(null);

    const { startDrawing, draw, stopDrawing, undoLast, clearAll } = useDraw();
    //for the father component handle the buttons
    useImperativeHandle(ref, () => ({
      undo: () => undoLast(internalCanvasRef.current),
      clear: () => clearAll(internalCanvasRef.current),
    }));

    return (
      <canvas
        ref={internalCanvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        width={cols * 25}
        height={rows * 25}
        className="absolute top-0 left-0  cursor-crosshair block"
      />
    );
  },
);
