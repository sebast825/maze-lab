import { Position } from "../../types";


/**
 * Converts a grid position into a unique string key.
 * This allows us to store and compare cells inside Sets.
 */
const toKey = (p: Position) => `${p.row},${p.col}`;

/**
 * Converts a path (array of positions) into a Set of unique cell keys.
 *
 * Example:
 * path = [(0,0), (0,1), (0,2)]
 *
 * set = {"0,0", "0,1", "0,2"}
 *
 * 👉 Sets automatically remove duplicates
 */
const buildPathSet = (path: Position[]): Set<string> => {
  return new Set(path.map(toKey));
};

/**
 * Computes Repeat Ratio using average Jaccard similarity between all path pairs.
 *
 * Core idea:
 * - Each path is converted into a Set of visited cells
 * - We compare all pairs of paths
 * - We measure how similar they are using Jaccard index
 */
export const computeRepeatRatio = (paths: Position[][]): number => {
  if (paths.length < 2) return 0;

  /**
   * Array of Sets, one per path:
   *
   * sets[i] = set of unique cells visited by path i
   *
   * Example:
   * [
   *   {"0,0","0,1","0,2"},
   *   {"0,0","1,0","2,0"}
   * ]
   */
  const sets = paths.map(buildPathSet);

  let sum = 0;
  let count = 0;

  /**
   * Iterate over all unique pairs of paths:
   * (0,1), (0,2), (1,2), etc.
   */
  for (let i = 0; i < sets.length; i++) {
    for (let j = i + 1; j < sets.length; j++) {
      const a = sets[i];
      const b = sets[j];

      /**
       * INTERSECTION:
       * Number of elements present in both sets.
       *
       * Example:
       * A = {0,0, 0,1}
       * B = {0,1, 1,1}
       *
       * intersection = {0,1} => size = 1
       */
      let intersection = 0;

      a.forEach((cell) => {
        if (b.has(cell)) intersection++;
      });

      /**
       * UNION:
       * Total number of unique elements across both sets.
       *
       * Formula:
       * union = |A| + |B| - |A ∩ B|
       *
       * Example:
       * A = {0,0, 0,1}  => size = 2
       * B = {0,1, 1,1}  => size = 2
       * intersection = 1
       *
       * union = 2 + 2 - 1 = 3
       *
       * Resulting set:
       * {0,0, 0,1, 1,1}
       */
      const union = a.size + b.size - intersection;

      /**
       * JACCARD INDEX:
       *
       * similarity = intersection / union
       *
       * Interpretation:
       * - 0   => no overlap
       * - 1   => identical paths
       *
       * Example:
       * intersection = 1
       * union = 3
       * => 0.33 similarity
       */
      const jaccard = union === 0 ? 0 : intersection / union;

      sum += jaccard;
      count++;
    }
  }

  /**
   * Final result:
   * average similarity across all path pairs
   */
  return count === 0 ? 0 : sum / count;
};