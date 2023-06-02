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

export type ProjectEdits = {
  pages: Page[];
};

export type IModal = "" | "dashboard-sign-in";

export type EditModeTool =
  | "text"
  | "image"
  | "color"
  | "move"
  | "folder"
  | "template"
  | "delete";

export type User = {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
} | null;
