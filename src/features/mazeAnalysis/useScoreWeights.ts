import { defaultWeights } from "@/lib/metrics/scoring/defaultWeights";
import { Weights } from "@/lib/metrics/scoring/types";
import { useState } from "react";

export const useScoreWeights = () => {
  const [weights, setWeights] = useState<Weights>(defaultWeights);

  const resetWeights = () => {
    setWeights(defaultWeights);
  };

  return {
    weights,
    setWeights,
    resetWeights,
  };
};
