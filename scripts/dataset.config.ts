import { rawDataGeneratedSelector } from "@dataset/generated/index"
import { rawDataManualSelector } from "@/lib/maze/benchmark/rawData/manual";


type DatasetMode = "generated" | "manual";

export const DATASET_MODE: DatasetMode = "generated";

const datasetMap = {
  generated: rawDataGeneratedSelector,
  manual: rawDataManualSelector,
} as const;

export const DATASET = datasetMap[DATASET_MODE];

export const FOLDER = DATASET_MODE === "generated" ? "./dataset/generated" : "./src/lib/maze/benchmark/rawData/manual";
