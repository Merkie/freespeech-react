import { ReactElement, createContext, useState } from "react";
import { AppMode, EditModeTool } from "../utils/types";

export const AppModeContext = createContext<{
  activeAppMode: AppMode;
  setActiveAppMode: (mode: AppMode) => void;
  activeEditModeTool: EditModeTool;
  setActiveEditModeTool: (tool: EditModeTool) => void;
  activeEditModeTile: string;
  setActiveEditModeTile: (tile: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}>({
  activeAppMode: "home",
  setActiveAppMode: () => null,
  activeEditModeTool: "text",
  setActiveEditModeTool: () => null,
  activeEditModeTile: "",
  setActiveEditModeTile: () => null,
  selectedColor: "red",
  setSelectedColor: () => null,
});

export const AppModeProvider = ({ children }: { children: ReactElement }) => {
  const [activeAppMode, setActiveAppMode] = useState<AppMode>("home");
  const [activeEditModeTool, setActiveEditModeTool] =
    useState<EditModeTool>("text");
  const [activeEditModeTile, setActiveEditModeTile] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState("red");

  return (
    <AppModeContext.Provider
      value={{
        activeAppMode,
        setActiveAppMode,
        activeEditModeTool,
        setActiveEditModeTool,
        activeEditModeTile,
        setActiveEditModeTile,
        selectedColor,
        setSelectedColor,
      }}
    >
      {children}
    </AppModeContext.Provider>
  );
};
