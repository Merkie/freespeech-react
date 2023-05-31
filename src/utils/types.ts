export type AppMode = "home" | "edit" | "dashboard";
export type Tile = {
  x: number;
  y: number;
  text: string;
  subpageIndex: number;
  image?: string;
};
