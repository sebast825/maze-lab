import { defaultWeights } from "@/lib/maze/metrics/scoring/defaultWeights";
import { Weights } from "@/lib/maze/metrics/scoring/types";
import { useState } from "react";


export const useScoreWeights = () => {
  const [weights, setWeights] = useState<Weights>(defaultWeights);

  const updateWeight = (
    section: keyof Weights,
    key: string,
    value: number,
  ) => {
    setWeights((prev) => {
      if (typeof prev[section] !== "object") {
        return {
          ...prev,
          [section]: value,
        };
      }

      return {
        ...prev,
        [section]: {
          ...(prev[section] as object),
          [key]: value,
        },
      };
    });
  };

  const resetWeights = () => {
   console.log("llega")
    setWeights(defaultWeights);
  };

  return {
    weights,
    setWeights,
    updateWeight,
    resetWeights,
  };
};