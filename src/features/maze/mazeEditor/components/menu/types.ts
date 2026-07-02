import { GameMode } from "@/features/maze/types";

export interface MenuProps {
        mazeData: any;
    showPath: boolean;
    setShowPath: (show: boolean) => void;
    cols: number;
}