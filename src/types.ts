import type { Container } from "pixi.js";

export type Prettify<T> =
  & {
    [K in keyof T]: T[K];
  }
  & {};

export type PixiContainer = Prettify<Container>;
