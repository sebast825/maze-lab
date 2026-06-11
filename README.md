## Benchmark Datasets

The project contains two benchmark sources:

### `manual/`

Hand-crafted mazes used for validation, debugging, and metric design.

These benchmarks are intentionally curated to represent specific maze patterns such as:

- Linear paths
- High ambiguity decisions
- Intricated routes
- Redundant loops
- Dead-end heavy layouts

The manual dataset is part of the repository and should be versioned.

---

### `generated/`

Automatically generated benchmark datasets used for large-scale statistical analysis.

These datasets are generated locally and are **not versioned** because they can be recreated at any time.

Examples:

- 50 DFS mazes (20x20)
- 50 Prim mazes (20x20)
- 50 Kruskal mazes (20x20)
- etc.

The `generated/` directory is ignored by Git.

---

## Benchmark Scripts

### Generate Dataset

Creates benchmark mazes for all configured algorithms and sizes and stores them in `generated/`.

```bash
npm run generate-dataset
```

Typical use case:

- Generate large datasets
- Compare generation algorithms
- Build statistical samples

---

### Regenerate Metrics

Recomputes all maze metrics using the current implementation and overwrites the stored metrics.

```bash
npm run regenerate-metrics
```

Typical use case:

- A metric formula changes
- A new metric is introduced
- Difficulty calculations are updated

This avoids manually recalculating every benchmark.

---

### Analyze Metric Correlations

Computes Pearson correlations between metrics across the benchmark dataset.

```bash
npm run analyzeMetricCorrelations
```

Typical use case:

- Detect redundant metrics
- Validate new metrics
- Reduce feature duplication
- Understand metric relationships

Example findings:

- Strong positive correlation may indicate duplicate information.
- Strong negative correlation may indicate inverse measurements.
- Weak correlation may indicate independent information.

---

## Recommended Workflow

When introducing or modifying metrics:

```bash
npm run generate-dataset
npm run regenerate-metrics
npm run analyzeMetricCorrelations
```

1. Generate a fresh benchmark dataset.
2. Recalculate all metrics.
3. Evaluate correlations and identify redundancy.
4. Refine the metric set if necessary.

---

## Benchmark Philosophy

The goal is not only to solve mazes, but to understand **why a maze feels easy or difficult to a human player**.

Metrics should therefore be:

- Explainable
- Interpretable
- Statistically validated
- As independent as possible from one another

The correlation analysis exists specifically to help identify metrics that may be measuring the same underlying property.