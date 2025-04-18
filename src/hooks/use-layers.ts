import { useApplication } from "@pixi/react";
import { useCallback } from "react";
import { useLayerStore } from "./use-layer-store.ts";

export function useLayers() {
  const { app, isInitialised } = useApplication();
  const handleLayer = useLayerStore((state) => state.addLayer);
  const layers = useLayerStore((x) => x.layers);

  const addLayer = useCallback((file: File, index: number) => {
    if (!isInitialised) return;
    handleLayer(file, index, app);
  }, [isInitialised, handleLayer, app]);

  // Sorting layers by zIndex
  const sortedLayers = [...layers].sort((a, b) => a.zIndex - b.zIndex);
  return { layers: sortedLayers, addLayer };
}
