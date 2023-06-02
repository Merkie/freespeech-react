import { ReactElement, createContext, useState } from "react";
import { AppMode, EditModeTool } from "../utils/types";

export const AppModeContext = createContext<{
  activeAppMode: AppMode;
  setActiveAppMode: (mode: AppMode) => void;
  activeEditModeTool: EditModeTool;
  setActiveEditModeTool: (tool: EditModeTool) => void;
}>({
  activeAppMode: "home",
  setActiveAppMode: () => null,
  activeEditModeTool: "text",
  setActiveEditModeTool: () => null,
});

export const AppModeProvider = ({ children }: { children: ReactElement }) => {
  const [activeAppMode, setActiveAppMode] = useState<AppMode>("home");
  const [activeEditModeTool, setActiveEditModeTool] =
    useState<EditModeTool>("text");

  return (
    <AppModeContext.Provider
      value={{
        activeAppMode,
        setActiveAppMode,
        activeEditModeTool,
        setActiveEditModeTool,
      }}
    >
      {children}
    </AppModeContext.Provider>
  );
};
