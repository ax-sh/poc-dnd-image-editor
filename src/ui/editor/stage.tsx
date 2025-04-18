import { useEffect, useMemo } from "react";
import { TextStyle } from "pixi.js";
import { useLayers } from "../../hooks/use-layers.ts";

import { Layer } from "./layer.tsx";

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
      {/*Render all image layers*/}
      {layers.map((layer) => (
        <Layer key={layer.id} x={layer.x} y={layer.y}>
          <pixiSprite
            texture={layer.texture}
          />
          <LayerText text={layer.id} />
        </Layer>
      ))}
    </pixiContainer>
  );
};
