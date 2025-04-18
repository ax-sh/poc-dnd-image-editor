import { useApplication } from "@pixi/react";
import { useCallback, useState } from "react";
import { readFileAsDataURL } from "./utils.ts";
import { Assets, Texture } from "pixi.js";
import {useLayerStore} from "./use-layer-store.ts";

interface ImageLayer {
  id: string;
  texture: Texture;
  x: number;
  y: number;
  zIndex: number;
}

export function useLayers() {
  const { app, isInitialised } = useApplication();
  const store = useLayerStore();
  const [layers, setLayers] = useState<ImageLayer[]>([]);
  const addLayer = useCallback(async function (file: File, index: number) {
    if (!isInitialised) return;
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
    // // bg is first, its not lighted
    // const bg = new TilingSprite({texture, width:app.screen.width, height:app.screen.height});
    // bg.tint = 0xff8080;
    // //
    // app.stage.addChild(bg)

    setLayers((prevLayers) => {
      const updatedLayers = [...prevLayers, newLayer];
      console.log("Updated layers:", updatedLayers);
      return updatedLayers;
    });
  }, [isInitialised, app.screen.height, app.screen.width]);

  // Sorting layers by zIndex
  const sortedLayers = [...layers].sort((a, b) => a.zIndex - b.zIndex);
  return { layers: sortedLayers, addLayer };
}
