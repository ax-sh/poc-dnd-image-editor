import { Application, extend, useApplication, useTick } from "@pixi/react";
import { Assets, Container, Graphics, Sprite, Texture } from "pixi.js";
import { Viewport } from "pixi-viewport";

import { useCallback, useEffect, useState } from "react";

// extend tells @pixi/react what Pixi.js components are available
extend({
  Container,
  Graphics,
  Sprite,
  Viewport,
});
interface ImageLayer {
  id: string;
  texture: Texture;
  x: number;
  y: number;
  zIndex: number;
}
type EditorProps = { files: File[] };

// Helper function to read a file as data URL
function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file as data URL"));
    };

    reader.readAsDataURL(file);
  });
}

function useLayers() {
  const { app } = useApplication();
  const [layers, setLayers] = useState<ImageLayer[]>([]);
  const addLayer = useCallback(async function (file: File, index: number) {
    const url = await readFileAsDataURL(file);
    const texture = await Assets.load(url);

    const newLayer: ImageLayer = {
      id: `layer-${Date.now()}-${index}`,
      texture,
      x: app.screen.width / 2 + (index * 30), // Center of screen with offset
      y: app.screen.height / 2 + (index * 30),
      zIndex: index,
    };
    setLayers((prevLayers) => {
      const updatedLayers = [...prevLayers, newLayer];
      console.log("Updated layers:", updatedLayers);
      return updatedLayers;
    });
  }, [app.screen.height, app.screen.width]);

  // Sorting layers by zIndex
  const sortedLayers = [...layers].sort((a, b) => a.zIndex - b.zIndex);
  return { layers: sortedLayers, addLayer };
}

const ChildComponent = ({ files }: EditorProps) => {
  const { layers, addLayer } = useLayers();

  // Load images when files prop changes
  useEffect(() => {
    // Only process new files
    if (!files || files.length === 0) return;

    // Process each file
    files.forEach((file, index) => {
      addLayer(file, index);
    });
  }, [files, addLayer]); // Re-run when files prop changes

  return (
    <pixiContainer>
      {/*<BunnySprite />*/}
      {/*Render all image layers*/}
      {layers.map((layer) => (
        <pixiSprite
          key={layer.id}
          texture={layer.texture}
          x={layer.x}
          y={layer.y}
          anchor={0.5}
        />
      ))}
      {/*<pixiSprite*/}
      {/*  // ref={spriteRef}*/}
      {/*  anchor={0.5}*/}
      {/*  eventMode={"static"}*/}
      {/*  onClick={(event) => setIsActive(!isActive)}*/}
      {/*  // onPointerOver={(event) => setIsHover(true)}*/}
      {/*  // onPointerOut={(event) => setIsHover(false)}*/}
      {/*  scale={isActive ? 1 : 1.5}*/}
      {/*  texture={texture}*/}
      {/*  x={100}*/}
      {/*  y={100}*/}
      {/*/>*/}
    </pixiContainer>
  );
};

export default function Editor({ files }: EditorProps) {
  return (
    // We'll wrap our components with an <Application> component to provide
    // the Pixi.js Application context
    <Application
      preference={"webgl"}
      resizeTo={window}
      antialias
      resolution={window.devicePixelRatio || 1}
    >
      <ChildComponent files={files} />
    </Application>
  );
}
