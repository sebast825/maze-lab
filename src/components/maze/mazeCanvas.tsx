'use client'
import { Maze } from '@/lib/maze/types'
import { useEffect, useRef } from 'react'

interface MazeCanvasProps {
  maze: Maze
  cellSize: number  // píxeles por celda, ej. 20
}

export const MazeCanvas = ({ maze, cellSize }: MazeCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    drawMaze(ctx, maze, cellSize)
  }, [maze, cellSize])

  return (
    <canvas
      ref={canvasRef}
      width={maze.cols * cellSize}
      height={maze.rows * cellSize}
      style={{ border: '1px solid black'}}
    />
  )
}

function drawMaze(ctx: CanvasRenderingContext2D, maze: Maze, cellSize: number) {
  const { rows, cols, cells } = maze
  
  ctx.clearRect(0, 0, cols * cellSize, rows * cellSize)
  
  
  ctx.fillStyle = '#f56'
  ctx.fillRect(0, 0, cols * cellSize, rows * cellSize)
  
  ctx.strokeStyle = '#444'
  ctx.lineWidth = 2
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = cells[row][col]
      const x = col * cellSize
      const y = row * cellSize
      
      if (cell.walls.north) {
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + cellSize, y)
        ctx.stroke()
      }
      
      if (cell.walls.south) {
        ctx.beginPath()
        ctx.moveTo(x, y + cellSize)
        ctx.lineTo(x + cellSize, y + cellSize)
        ctx.stroke()
      }
      

      if (cell.walls.east) {
        ctx.beginPath()
        ctx.moveTo(x + cellSize, y)
        ctx.lineTo(x + cellSize, y + cellSize)
        ctx.stroke()
      }
      
      if (cell.walls.west) {
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x, y + cellSize)
        ctx.stroke()
      }
     
    }
  }
}