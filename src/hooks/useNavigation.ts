"use client";

import { useRouter } from "next/navigation";

export function useNavigation() {
  const router = useRouter();

  const goToHome = () => {
    router.push("/");
  };

  const goToMazeAnalysis = () => {
    router.push("/maze-analysis");
  };

  const back = () => {
    router.back();
  };

  return {
    goToHome,
    goToMazeAnalysis,
    back,
  };
}