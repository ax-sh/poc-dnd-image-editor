import { type PropsWithChildren, useState } from "react";
import type { FederatedPointerEvent } from "pixi.js";
import { PixiContainer } from "../../types.ts";

type LayerProps = PropsWithChildren<Pick<PixiContainer, "x" | "y">>;
export function Layer({ children, x, y, ...rest }: LayerProps) {
  const [isHovered, setIsHover] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const handlePointerOver = (event: FederatedPointerEvent) => {
    // console.log(event.target, 888);
    setIsHover(true);
  };
  const handlePointerOut = (event: FederatedPointerEvent) => {
    setIsHover(false);
    // setIsActive(!isActive);
  };
  const handleClick = (event: FederatedPointerEvent) => {
    console.log(event);
    setIsActive(!isActive);
  };

  return (
    <pixiContainer
      x={x}
      y={y}
      anchor={0.5}
      eventMode={"static"}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      scale={isHovered ? 1 : .06}
      {...rest}
    >
      {children}
    </pixiContainer>
  );
}
