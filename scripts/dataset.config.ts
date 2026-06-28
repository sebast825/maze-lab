import { rawDataGeneratedSelector } from "@dataset/generated/index"
import { rawDataManualSelector } from "@/lib/infrastructure/benchmark/rawData/manual";
import { Folder } from "lucide-react";


type DatasetMode = "generated" | "manual";

export const DATASET_MODE: DatasetMode = "generated";

const datasetMap = {
  generated: rawDataGeneratedSelector,
  manual: rawDataManualSelector,
} as const;

export const DATASET = datasetMap[DATASET_MODE];

const folderMap: Record<DatasetMode, string> = {
  generated: "./dataset/generated",
  manual: "./src/lib/infrastructure/benchmark/rawData/manual",
};

export const FOLDER = folderMap[DATASET_MODE];

console.log(FOLDER)
