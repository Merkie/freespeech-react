export type AppMode = "home" | "edit" | "dashboard";

export type Tile = {
  x: number;
  y: number;
  text: string;
  subpageIndex: number;
  image?: string;
  folder?: string;
};

export type Page = {
  name: string;
  tiles: Tile[];
};

export type Project = {
  name: string;
  columns: number;
  rows: number;
  pages: Page[];
};

export type IModal = "" | "edit-sign-in" | "dashboard-sign-in";
