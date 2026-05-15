import { AlgorithmType } from "@/lib/alogirthms/generation";

export const algorithmLabels :Record<AlgorithmType,string> = {
  dfs: 'DFS (Depth-First Search)',
  prim: 'Prim',
  aldousBroader: 'Aldous-Broder',
  kruskal: 'Kruskal'
}