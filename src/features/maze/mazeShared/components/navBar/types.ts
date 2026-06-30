import { MazeData } from "@/lib/maze/types";

export interface NavbarProps {
      cols: number;
  showPath: boolean;
  setShowPath: (show: boolean) => void;
  handleExportToPDF: (data: MazeData, cols: number) => void;
  mazeData: MazeData | null;
}