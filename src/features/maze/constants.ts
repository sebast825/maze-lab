import { AlgorithmType } from "@/lib/alogirthms/generation";

export const algorithmLabels :Record<AlgorithmType,string> = {
  tree: "Three",
  worms: "Worms Growth",
  dfs: 'DFS (Depth-First Search)',
  prim: 'Prim',
  aldousBroder: 'Aldous-Broder',
  kruskal: 'Kruskal',
  randomTraversal: "Random Traversal"
}