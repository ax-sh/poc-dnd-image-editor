import { useEffect, useState } from "react";
import { FederatedPointerEvent } from "pixi.js";
import { useLayers } from "../../hooks/use-layers.ts";

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

  const handlePointerOver = (event: FederatedPointerEvent) => {
    console.log(event.target, 888);
    setIsHover(true);
  };
  const handlePointerOut = (event: FederatedPointerEvent) => {
    setIsHover(false);
  };
  const handleClick = (event: FederatedPointerEvent) => {
    console.log(event);
    setIsActive(!isActive);
  };
  return (
    <pixiContainer>
      {/*Render all image layers*/}
      {layers.map((layer) => (
        <pixiContainer
          key={layer.id}
          x={layer.x}
          y={layer.y}
          anchor={0.5}
          eventMode={"static"}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          scale={isActive ? 1 / 2 : 1 / 10}
        >
          <pixiSprite
            texture={layer.texture}
          />
          <pixiText  text='SKEW IS COOL'/>
        </pixiContainer>
      ))}
    </pixiContainer>
  );
};
