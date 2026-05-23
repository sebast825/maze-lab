export type Cell = {
  visited: boolean;
  walls: {
    north: boolean;
    east: boolean;
    south: boolean;
    west: boolean;
  };
  isHead ?:boolean;
  startPoint? : boolean
  groupId?: number
};


export type Maze = {
   rows: number;
  cols: number;
   cells: Cell[][];
}

export interface Position {
  row: number
  col: number
}

export interface MazeData {
  maze: Maze          
  start: Position
  end: Position       
  solution?: Position[] 
}