import { Application, Assets, Texture } from "pixi.js";
import { create } from "zustand/react";
import { readFileAsDataURL } from "../ui/editor/utils.ts";

export interface ImageLayer {
  id: string;
  texture: Texture;
  x: number;
  y: number;
  zIndex: number;
}
// Define the store state interface
interface LayerState {
  readonly layers: ImageLayer[];
  // Actions
  addLayer: (
    file: File,
    index: number,
    app: Application,
  ) => Promise<void>;
  updateLayerPosition: (id: string, x: number, y: number) => void;
  updateLayerZIndex: (id: string, zIndex: number) => void;
  removeLayer: (id: string) => void;
  sortedLayers: () => ImageLayer[];
}
// Create the store with type safety
export const useLayerStore = create<LayerState>((set, get) => ({
  layers: [],
  addLayer: async (file, index, app) => {
    try {
      const url = await readFileAsDataURL(file);
      const texture = await Assets.load(url);
      const x = app.screen.width / 2 + (index * 30); // Center of screen with offset
      const y = app.screen.height / 2 + (index * 30);

      const newLayer: ImageLayer = {
        id: `layer-${Date.now()}-${index}`,
        texture,
        x,
        y,
        zIndex: index,
      };

      set((state) => ({
        layers: [...state.layers, newLayer],
      }));

      console.log("Layer added:", newLayer);
    } catch (error) {
      console.error("Failed to add layer:", error);
    }
  },

  updateLayerPosition: (id, x, y) => {
    set((state) => ({
      layers: state.layers.map((layer) =>
        layer.id === id ? { ...layer, x, y } : layer
      ),
    }));
  },

  updateLayerZIndex: (id, zIndex) => {
    set((state) => ({
      layers: state.layers.map((layer) =>
        layer.id === id ? { ...layer, zIndex } : layer
      ),
    }));
  },

  removeLayer: (id) => {
    set((state) => ({
      layers: state.layers.filter((layer) => layer.id !== id),
    }));
  },

  sortedLayers: () => {
    return [...get().layers].sort((a, b) => a.zIndex - b.zIndex);
  },
}));
