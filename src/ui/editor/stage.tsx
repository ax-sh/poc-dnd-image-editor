import { useLayers } from "./use-layers.tsx";
import { useEffect, useState } from "react";
import { Texture } from "pixi.js";

export type EditorProps = { files: File[] };

export const Stage = ({ files }: EditorProps) => {
  const { layers, addLayer } = useLayers();

  const [isHovered, setIsHover] = useState(false);
  const [isActive, setIsActive] = useState(false);

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
    <pixiContainer
      onClick={(event) => setIsActive(!isActive)}
      onPointerOver={(event) => setIsHover(true)}
      onPointerOut={(event) => setIsHover(false)}
    >
      {/*Render all image layers*/}
      {layers.map((layer) => (
        <pixiContainer
          key={layer.id}
          x={layer.x}
          y={layer.y}
          anchor={0.5}
          eventMode={"static"}
          scale={isActive ? 1 / 2 : 1 / 10}
        >
          <pixiSprite
            texture={layer.texture}
          />
        </pixiContainer>
      ))}
    </pixiContainer>
  );
};
