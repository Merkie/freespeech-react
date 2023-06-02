import { ReactElement, createContext, useState } from "react";
import { AppMode, EditModeTool } from "../utils/types";

export const AppModeContext = createContext<{
  activeAppMode: AppMode;
  setActiveAppMode: (mode: AppMode) => void;
  activeEditModeTool: EditModeTool;
  setActiveEditModeTool: (tool: EditModeTool) => void;
  activeEditModeTile: string;
  setActiveEditModeTile: (tile: string) => void;
}>({
  activeAppMode: "home",
  setActiveAppMode: () => null,
  activeEditModeTool: "text",
  setActiveEditModeTool: () => null,
  activeEditModeTile: "",
  setActiveEditModeTile: () => null,
});

export const AppModeProvider = ({ children }: { children: ReactElement }) => {
  const [activeAppMode, setActiveAppMode] = useState<AppMode>("home");
  const [activeEditModeTool, setActiveEditModeTool] =
    useState<EditModeTool>("text");
  const [activeEditModeTile, setActiveEditModeTile] = useState<string>("");

  return (
    <AppModeContext.Provider
      value={{
        activeAppMode,
        setActiveAppMode,
        activeEditModeTool,
        setActiveEditModeTool,
        activeEditModeTile,
        setActiveEditModeTile,
      }}
    >
      {children}
    </AppModeContext.Provider>
  );
};
