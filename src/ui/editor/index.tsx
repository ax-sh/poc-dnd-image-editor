import { Application, extend } from "@pixi/react";
import { Container, Graphics, Sprite, Texture } from "pixi.js";
import { Viewport } from "pixi-viewport";

import { useEffect } from "react";
import { useLayers } from "./use-layers.tsx";

// extend tells @pixi/react what Pixi.js components are available
extend({
  Container,
  Graphics,
  Sprite,
  Viewport,
});

type EditorProps = { files: File[] };

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
