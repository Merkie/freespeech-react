import { ReactElement, createContext, useState } from "react";
import { AppMode } from "../utils/types";

export const AppModeContext = createContext<{
  activeAppMode: AppMode;
  setActiveAppMode: (mode: AppMode) => void;
}>({
  activeAppMode: "home",
  setActiveAppMode: () => null,
});

export const AppModeProvider = ({ children }: { children: ReactElement }) => {
  const [activeAppMode, setActiveAppMode] = useState<AppMode>("home");

  return (
    <AppModeContext.Provider
      value={{
        activeAppMode,
        setActiveAppMode,
      }}
    >
      {children}
    </AppModeContext.Provider>
  );
};
