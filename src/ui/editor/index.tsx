import { Application, extend } from "@pixi/react";
import { Container, Graphics, Sprite } from "pixi.js";
import { Viewport } from "pixi-viewport";

import { useRef } from "react";
import { EditorProps, Stage } from "./stage.tsx";

// extend tells @pixi/react what Pixi.js components are available
extend({
  Container,
  Graphics,
  Sprite,
  Viewport,
});

export default function Editor({ files }: EditorProps) {
  const ref = useRef<HTMLElement>(null);

  // We'll wrap our components with an <Application> component to provide
  // the Pixi.js Application context
  return (
    <main ref={ref} className={"h-full w-full"}>
      <Application
        preference={"webgl"}
        resizeTo={ref}
        antialias
        // resolution={window.devicePixelRatio || 1}
      >
        <Stage files={files} />
      </Application>
    </main>
  );
}
