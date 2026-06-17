"use client";

import { ActionButton } from "@/components/actionButton";
import { PANEL_CLASSES } from "@/components/themes";
import { Weights } from "@/lib/maze/metrics/scoring/types";
import { useEffect, useState } from "react";

interface Props {
  weights: Weights;
  onApply: (weights: Weights) => void;
  onResset: () => void;
}

export function ScoreWeightsPanel({ weights, onApply, onResset }: Props) {
  const [draft, setDraft] = useState(weights);

  useEffect(() => {
    setDraft(weights);
  }, [weights]);

  const updateNestedValue = (
    section: keyof Weights,
    key: string,
    value: number,
  ) => {
    setDraft((prev) => {
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

  return (
    <div className={`${PANEL_CLASSES.container}`}>
      <h2 className={`${PANEL_CLASSES.title} text-white`}>Score Weights</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(draft).map(([sectionName, sectionValue]) => {
          if (typeof sectionValue !== "object") {
            return (
              <div key={sectionName} className={PANEL_CLASSES.card}>
                <h3 className="font-semibold text-purple-300 mb-3">Global</h3>

                <div className="flex items-center gap-2">
                  <label className="text-white flex-1">{sectionName}</label>

                  <input
                    type="number"
                    step="0.1"
                    value={sectionValue}
                    onChange={(e) =>
                      updateNestedValue(
                        sectionName as keyof Weights,
                        "",
                        Number(e.target.value),
                      )
                    }
                    className={`${PANEL_CLASSES.input} w-24`}
                  />
                </div>
              </div>
            );
          }

          return (
            <div key={sectionName} className={PANEL_CLASSES.card}>
              <h3 className="font-semibold text-purple-300 mb-3 capitalize">
                {sectionName}
              </h3>

              <div className="space-y-2">
                {Object.entries(sectionValue).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between gap-2"
                  >
                    <label className="text-white text-sm">{key}</label>

                    <input
                      type="number"
                      step="0.1"
                      value={value as number}
                      onChange={(e) =>
                        updateNestedValue(
                          sectionName as keyof Weights,
                          key,
                          Number(e.target.value),
                        )
                      }
                      className={`${PANEL_CLASSES.input} w-20`}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full flex gap-4 mt-4">
        <ActionButton onClick={() => onApply(draft)} color={"blue"}>
          Apply Weights
        </ActionButton>
        <ActionButton onClick={() => onResset()} color={"red"}>
          Reset Weights
        </ActionButton>
      </div>
    </div>
  );
}
