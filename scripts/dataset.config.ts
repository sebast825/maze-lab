import {
  rawDataGeneratedSelector,
  rawDataManualSelector,
} from "@/lib/maze/benchmark";

type DatasetMode = "generated" | "manual";

export const DATASET_MODE: DatasetMode = "generated";

const datasetMap = {
  generated: rawDataGeneratedSelector,
  manual: rawDataManualSelector,
} as const;

export const DATASET = datasetMap[DATASET_MODE];
