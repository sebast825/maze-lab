import { Position } from "@/lib/maze/types"

export interface BFSResult {
  cellInfo: CellInfo[][]
  farthest: Position & { distance: number }
}


export interface CellInfo {
  distance: number
  parent: Position | null
}