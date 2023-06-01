import { useState } from "react";

function usePageNavigation(initialPage: string) {
  const [pageHistory, setPageHistory] = useState<string[]>([initialPage]);
  const [pageIndex, setPageIndex] = useState(0);

  const handlePageNavigation = (pageName: string) => {
    if (pageIndex === 0) {
      setPageHistory([pageName, ...pageHistory]);
      return;
    }
    setPageHistory([
      pageName,
      ...pageHistory.slice(pageIndex, pageHistory.length),
    ]);
    setPageIndex(0);
  };

  const navigateBack = () => {
    if (pageIndex === pageHistory.length - 1) return;
    setPageIndex(pageIndex + 1);
  };

  const navigateForwards = () => {
    if (pageIndex === 0) return;
    setPageIndex(pageIndex - 1);
  };

  const resetPageHistory = () => {
    setPageHistory([initialPage]);
    setPageIndex(0);
  };

  return {
    pageHistory,
    pageIndex,
    handlePageNavigation,
    navigateBack,
    navigateForwards,
    resetPageHistory,
  };
}

export default usePageNavigation;
