import { AlgorithmType } from "@/lib/alogirthms/generation";

export const algorithmLabels :Record<AlgorithmType,string> = {
  three: "Three",
  worms: "Worms Growth",
  dfs: 'DFS (Depth-First Search)',
  prim: 'Prim',
  aldousBroader: 'Aldous-Broder',
  kruskal: 'Kruskal'
}