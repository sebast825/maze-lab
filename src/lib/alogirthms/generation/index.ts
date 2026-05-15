"use client"
import { generateAldousBroader } from "./aldous-broader";
import { generateDFS } from "./dfs";
import { generateKruskal } from "./kruskal/kruskal";
import { generatePrim } from "./prim";
import { MazeGeneratorFn  } from "./types";

export const algorithmNames = {
  dfs: 'dfs',
  prim: 'prim',
  aldousBroader: 'aldousBroader',
  kruskal: 'kruskal'
} as const

export type AlgorithmType = typeof algorithmNames[keyof typeof algorithmNames]

export const mazesGenerator : Record<AlgorithmType,MazeGeneratorFn > = {
   dfs : generateDFS,
   prim : generatePrim,
   aldousBroader:generateAldousBroader,
   kruskal : generateKruskal
}

