"use client";
import { generateAldousBroder } from "./aldous-broder";
import { generateDFS } from "./dfs";
import { generateKruskal } from "./kruskal/kruskal";
import { generateRandomTraversal } from "./randomTraversal";
import { generatePrim } from "./prim";
import { generateTree } from "./tree";
import { MazeGeneratorFn } from "./types";
import { generateWorms } from "./worms";

export const algorithmNames = {
  randomTraversal: "randomTraversal",
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
  randomTraversal: generateRandomTraversal,
};
