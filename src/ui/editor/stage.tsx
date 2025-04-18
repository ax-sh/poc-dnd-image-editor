import { useEffect, useMemo, useState } from "react";
import { FederatedPointerEvent, TextStyle } from "pixi.js";
import { useLayers } from "../../hooks/use-layers.ts";

export type EditorProps = { files: File[] };

function LayerText({ text }: { text: string }) {
  const style = useMemo(() => {
    return new TextStyle({
      fontFamily: "Arial",
      // dropShadow: {
      //   alpha: 0.8,
      //   angle: 2.1,
      //   blur: 4,
      //   color: '0x111111',
      //   distance: 10,
      // },
      fill: "#ffffff",
      // stroke: { color: '#004620', width: 12, join: 'round' },
      fontSize: 60,
      fontWeight: "lighter",
    });
  }, []);
  return <pixiText text={text} style={style} />;
}

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
          <LayerText text={layer.id} />
        </pixiContainer>
      ))}
    </pixiContainer>
  );
};
