"use client";

import { MazeScoringResult } from "@/lib/maze/metrics/scoring/types";
import { MetricCard } from "./metricCard";
import { ScoreRow } from "./scoreRow";
import { useEffect } from "react";
import { PANEL_CLASSES } from "@/components/themes";

interface Props {
  data: MazeScoringResult;
}

export function MazeAnalysisPanel({ data }: Props) {
  useEffect(() => {
    console.log(data);
  }, [data]);

  const { raw, scores, weighted } = data;

  return (
    <div
      className={`flex flex-col lg:flex-row gap-8 ${PANEL_CLASSES.container}`}
    >
      <main className="flex-1 space-y-8">
        {/* RAW METRICS */}
        <section>
          <h3 className={`${PANEL_CLASSES.title}  text-cyan-300`}>
            Raw Metrics
          </h3>

          <div className="grid gap-4 lg:grid-cols-3">
            <MetricCard title="Features" data={raw.features} />
            <MetricCard title="Paths" data={raw.paths} />
            <MetricCard title="Path Overlaps" data={raw.overlaps} />
          </div>
        </section>

        {/* DERIVED METRICS */}
        <section>
          <h3 className={`${PANEL_CLASSES.title}  text-purple-300`}>
            Weighted Metrics
          </h3>

          <div className="grid gap-4 lg:grid-cols-3">
            <MetricCard title="Features" data={weighted.features} />
            <MetricCard title="Paths" data={weighted.paths} />
            <MetricCard title="Path Overlaps" data={weighted.overlaps} />
          </div>
        </section>
      </main>

      <aside className="lg:w-80 shrink-0">
        {/* SCORE BREAKDOWN */}
        <section>
          <h3 className={`${PANEL_CLASSES.title}  text-green-300`}>
            Score Breakdown
          </h3>

          <div className={PANEL_CLASSES.card}>
            <ScoreRow label="Features Score" value={scores.features} />
            <ScoreRow label="Paths Score" value={scores.paths} />
            <ScoreRow label="Overlaps Score" value={scores.overlaps} />
            <ScoreRow label="Final Score" value={scores.total} highlight />
          </div>
        </section>
      </aside>
    </div>
  );
}
