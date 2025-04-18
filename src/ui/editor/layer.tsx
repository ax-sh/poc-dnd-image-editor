import { type PropsWithChildren, useState } from "react";
import type { FederatedPointerEvent } from "pixi.js";
import { PixiContainer } from "../../types.ts";
import React from "react";

type LayerProps = PropsWithChildren<Pick<PixiContainer, "x" | "y">>;
function LayerComponent({ children, x, y, ...rest }: LayerProps) {
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

  function onDragStart(event: FederatedPointerEvent) {
    if (!this.dragging) {
      this.data = event.data;
      this.oldGroup = this.parentGroup;
      // this.parentGroup = dragGroup;
      this.dragging = true;

      this.scale.x *= 1.1;
      this.scale.y *= 1.1;
      this.dragPoint = event.getLocalPosition(this.parent);
      this.dragPoint.x -= this.x;
      this.dragPoint.y -= this.y;
    }
  }

  function onDragEnd() {
    if (this.dragging) {
      this.dragging = false;
      this.parentGroup = this.oldGroup;
      this.scale.x /= 1.1;
      this.scale.y /= 1.1;
      // set the interaction data to null
      this.data = null;
    }
  }

  function onDragMove() {
    if (this.dragging) {
      const newPosition = this.data.getLocalPosition(this.parent);
      this.x = newPosition.x - this.dragPoint.x;
      this.y = newPosition.y - this.dragPoint.y;
    }
  }

  //   obj.on('mousedown', onDragStart)
  //         .on('touchstart', onDragStart)
  //         .on('mouseup', onDragEnd)
  //         .on('mouseupoutside', onDragEnd)
  //         .on('touchend', onDragEnd)
  //         .on('touchendoutside', onDragEnd)
  //         .on('mousemove', onDragMove)
  //         .on('touchmove', onDragMove);

  return (
    <pixiContainer
      x={x}
      y={y}
      anchor={0.5}
      interactive={true}
      eventMode={"static"}
      onClick={handleClick}
      onPointerDown={onDragStart}
      onPointerUp={onDragEnd}
      onPointerUpOutside={onDragEnd}
      onPointerMove={onDragMove}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      scale={isHovered ? 1 : .06}
      {...rest}
    >
      {children}
    </pixiContainer>
  );
}

export const Layer = React.memo(LayerComponent);
