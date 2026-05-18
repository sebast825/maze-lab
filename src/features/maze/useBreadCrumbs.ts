import { useEffect, useRef } from "react";
import { Position, MazeData } from "@/lib/maze/types";

interface UseBreadCrumbsProps {
  position: Position;
  mazeData: MazeData;
}

export const useBreadCrumbs = ({ position, mazeData }: UseBreadCrumbsProps) => {
  const visitedCells = useRef<Set<string>>(new Set());
  const prevLogicalPos = useRef<Position | null>(null);

  // clear tracking when maze changes
  useEffect(() => {
    visitedCells.current.clear();
    prevLogicalPos.current = null;
  }, [mazeData]);

  
  useEffect(() => {
    if (!position) return;

    if (prevLogicalPos.current) {
      const prevKey = `${prevLogicalPos.current.row},${prevLogicalPos.current.col}`;
      visitedCells.current.add(prevKey);
    }

    prevLogicalPos.current = position;
  }, [position]);

  return visitedCells; 
};