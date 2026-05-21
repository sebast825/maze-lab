"use client";
import { generateAldousBroader } from "./aldous-broader";
import { generateDFS } from "./dfs";
import { generateKruskal } from "./kruskal/kruskal";
import { generatePrim } from "./prim";
import { generateThree } from "./three";
import { MazeGeneratorFn } from "./types";
import { generateWorms } from "./worms";

export const algorithmNames = {
  three: "three",
  worms: "worms",
  dfs: "dfs",
  prim: "prim",
  aldousBroader: "aldousBroader",
  kruskal: "kruskal",
} as const;

export type AlgorithmType =
  (typeof algorithmNames)[keyof typeof algorithmNames];

export const mazesGenerator: Record<AlgorithmType, MazeGeneratorFn> = {
  three: generateThree,
  worms: generateWorms,
  dfs: generateDFS,
  prim: generatePrim,
  aldousBroader: generateAldousBroader,
  kruskal: generateKruskal,
};
