import { Position } from "@/lib/maze/types";
import React, { useRef } from "react";

type Props = {
    rows: number;
    cols: number;
    cellSize: number;
    onCellClick: (posA: Position, posB: Position) => void;
};

export const MazeOverlay = ({
    rows,
    cols,
    cellSize,
    onCellClick,
}: Props) => {
    const ref = useRef<HTMLDivElement | null>(null);

    const handleClick = (e: React.MouseEvent): void => {
        const el = ref.current;
        if (!el) throw Error;

        const rect = el.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        console.log(x, y)
        const col = Math.floor(x / cellSize);
        const row = Math.floor(y / cellSize);

        if (row < 0 || row >= rows) throw Error;
        if (col < 0 || col >= cols) throw Error;
        const cellA: Position = { row, col }
        const localX = x - col * cellSize;
        const localY = y - row * cellSize;
        const cellB: Position = getClosestNeighbor(cellA, localX, localY)
        onCellClick(cellA, cellB);
    };

    /**
     * Returns the neighboring cell that shares the wall closest to the click position.
     * localX and localY are coordinates relative to the clicked cell.
     */
    const getClosestNeighbor = (
        cell: Position,
        localX: number,
        localY: number,
    ): Position => {
        const distances = {
            north: localY,
            south: cellSize - localY,
            west: localX,
            east: cellSize - localX,
        };
        console.log(distances)
        const closestSide = Object.entries(distances)
            .reduce((min, current) =>
                current[1] < min[1] ? current : min
            )[0];

        switch (closestSide) {
            case "north":
                return { row: cell.row - 1, col: cell.col };

            case "south":
                return { row: cell.row + 1, col: cell.col };

            case "west":
                return { row: cell.row, col: cell.col - 1 };

            case "east":
                return { row: cell.row, col: cell.col + 1 };

            default:
                throw new Error("Invalid side");
        }
    }
    return (
        <div
            ref={ref}
            onClick={handleClick}
            style={{
                position: "absolute",
                inset: 0,
                cursor: "pointer",
            }}
        />
    );
};