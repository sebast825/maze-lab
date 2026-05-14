export type Cell = {
  visited: boolean;
  walls: {
    north: boolean;
    east: boolean;
    south: boolean;
    west: boolean;
  };
};


export type Maze = {
   rows: number;
  cols: number;
   cells: Cell[][];
}

export interface Position {
  x: number
  y: number
}

export interface MazeData {
  maze: Maze          
  start: Position
  end: Position       
  solution?: Position[] 
}