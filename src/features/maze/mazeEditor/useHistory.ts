import { useState, useCallback } from "react";

export function useHistory<T>() {
  const [history, setHistory] = useState<T[]>([]);
  const [redoStack, setRedoStack] = useState<T[]>([]);

  const pushAction = useCallback((action: T) => {
    setHistory((prev) => [...prev, action]);
    setRedoStack([]);
  }, []);

  const popUndo = useCallback(() => {
    if (history.length === 0) return null;
    const lastAction = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setRedoStack((prev) => [...prev, lastAction]);
    return lastAction;
  }, [history]);

  const popRedo = useCallback(() => {
    if (redoStack.length === 0) return null;
    const nextAction = redoStack[redoStack.length - 1];
    setRedoStack((prev) => prev.slice(0, -1));
    setHistory((prev) => [...prev, nextAction]);
    return nextAction;
  }, [redoStack]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    setRedoStack([]);
  }, []);

  return {
    pushAction,
    popUndo,
    popRedo,
    clearHistory,
    canUndo: history.length > 0,
    canRedo: redoStack.length > 0,
  };
}