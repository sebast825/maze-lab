import { GameMode } from "@/features/maze/types";
import { AlgorithmType } from "@/lib/algorithms/generation";
import { MazeData } from "@/lib/maze/types";

export interface NavbarProps {
  algorithm: AlgorithmType;
  setAlgorithm: (alg: AlgorithmType) => void;
  rows: number;
  setRows: (rows: number) => void;
  cols: number;
  setCols: (cols: number) => void;
  handleGenerate: () => void;
  showPath: boolean;
  setShowPath: (show: boolean) => void;
  handleExportToPDF: (data: MazeData, cols: number) => void;
  mazeData: MazeData | null;
  gameMode: GameMode;
  setGameMode: (mode: GameMode) => void;
  handleUndoDraw: () => void;
  handleClearDraw: () => void;
  total: number | undefined;
}