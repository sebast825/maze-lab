"use client";
import { generateAldousBroder } from "./aldous-broder";
import { generateDFS } from "./dfs";
import { generateKruskal } from "./kruskal/kruskal";
import { generatePrim } from "./prim";
import { generateTree } from "./tree";
import { MazeGeneratorFn } from "./types";
import { generateWorms } from "./worms";

export const algorithmNames = {
  tree: "tree",
  worms: "worms",
  dfs: "dfs",
  prim: "prim",
  aldousBroder: "aldousBroder",
  kruskal: "kruskal",
} as const;

export type AlgorithmType =
  (typeof algorithmNames)[keyof typeof algorithmNames];

export const mazesGenerator: Record<AlgorithmType, MazeGeneratorFn> = {
  tree: generateTree,
  worms: generateWorms,
  dfs: generateDFS,
  prim: generatePrim,
  aldousBroder: generateAldousBroder,
  kruskal: generateKruskal,
};
