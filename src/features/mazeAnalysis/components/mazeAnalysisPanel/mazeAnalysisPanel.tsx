"use client";

import { MazeScoringResult } from "@/lib/maze/metrics/scoring/types";
import { MetricCard } from "./metricCard";
import { ScoreRow } from "./scoreRow";
import { useEffect } from "react";

interface Props {
  data: MazeScoringResult;
}

export function MazeAnalysisPanel({ data }: Props) {

  useEffect(()=>{console.log(data)},[data])
  const { raw, scores ,weighted} = data;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <main className="flex-1 space-y-8">
        {/* RAW METRICS */}
        <section>
          <h3 className="mb-4 text-xl font-semibold text-cyan-300">
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
          <h3 className="mb-4 text-xl font-semibold text-purple-300">
            Derived Metrics
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
          <h3 className="mb-4 text-xl font-semibold text-green-300">
            Score Breakdown
          </h3>

          <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
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
