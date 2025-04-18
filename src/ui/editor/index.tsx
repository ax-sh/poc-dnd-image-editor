import { Application, extend, useApplication, useTick } from "@pixi/react";
import { Assets, Container, Graphics, Sprite, Texture } from "pixi.js";
import { Viewport } from "pixi-viewport";

import { BunnySprite } from "./BunnySprite";
import { useEffect } from "react";

// extend tells @pixi/react what Pixi.js components are available
extend({
  Container,
  Graphics,
  Sprite,
  Viewport,
});

type EditorProps = { files: File[] };
const ChildComponent = ({ files }: EditorProps) => {
  console.log(files);
  // <pre>
  //          {JSON.stringify(files,null,5)}
  //       </pre>
  // useTick(() => console.log('This will be logged on every tick'));
  // Preload the sprite if it hasn't been loaded yet
  useEffect(() => {

  }, []);

  const { app } = useApplication();

  return (
    <>
      <BunnySprite />
    </>
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
