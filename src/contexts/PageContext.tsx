import { ReactElement, createContext } from "react";
import usePageNavigation from "../hooks/usePageNavigation";

export const PageContext = createContext<{
  pageHistory: string[];
  pageIndex: number;
  navigateBack: () => void;
  navigateForwards: () => void;
  resetPageHistory: () => void;
  handlePageNavigation: (pageName: string) => void;
}>({
  pageHistory: ["home"],
  pageIndex: 0,
  navigateBack: () => null,
  navigateForwards: () => null,
  resetPageHistory: () => null,
  handlePageNavigation: () => null,
});

export const PageProvider = ({ children }: { children: ReactElement }) => {
  const {
    pageHistory,
    pageIndex,
    navigateBack,
    navigateForwards,
    resetPageHistory,
    handlePageNavigation,
  } = usePageNavigation("home");

  return (
    <PageContext.Provider
      value={{
        pageHistory,
        pageIndex,
        navigateBack,
        navigateForwards,
        resetPageHistory,
        handlePageNavigation,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
