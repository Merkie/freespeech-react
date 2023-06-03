import { ReactElement, createContext, useEffect, useState } from "react";
import { Page, Project, ProjectEdits, Tile } from "../utils/types";
import english from "../utils/layouts/english";
import usePageNavigation from "../hooks/usePageNavigation";
import { useLocalStorage } from "react-use";
import useProject from "../hooks/useProject";
import useEditableProject from "../hooks/useEditableProject";

export const ProjectContext = createContext<{
  // Project State
  activeProject: Project;
  activePage: Page;
  // Page Navigation functions
  navigateBack: () => void;
  navigateForwards: () => void;
  resetPageHistory: () => void;
  handlePageNavigation: (pageName: string) => void;
  // Page Navigation state
  canNavigateBack: boolean;
  canNavigateForwards: boolean;
  // Edit functions
  mergeCurrentPageEdits: () => void;
  clearCurrentPageEdits: () => void;
  addEdit: (tileToEdit: Tile) => void;
  // Edit state
  activePageTilesWithEdits: Tile[]; // Renders during edit mode
}>({
  activeProject: english,
  activePage: english.pages[0],
  navigateBack: () => null,
  navigateForwards: () => null,
  resetPageHistory: () => null,
  handlePageNavigation: () => null,
  canNavigateBack: false,
  canNavigateForwards: false,
  mergeCurrentPageEdits: () => null,
  clearCurrentPageEdits: () => null,
  addEdit: () => null,
  activePageTilesWithEdits: [],
});

export const ProjectProvider = ({ children }: { children: ReactElement }) => {
  const {
    pageHistory,
    pageIndex,
    navigateBack,
    navigateForwards,
    resetPageHistory,
    handlePageNavigation,
    canNavigateBack,
    canNavigateForwards,
  } = usePageNavigation("home");

  const { activeProject, setActiveProject, activePage } = useProject(
    pageHistory[pageIndex]
  );

  const {
    mergeCurrentPageEdits,
    clearCurrentPageEdits,
    activePageTilesWithEdits,
    addEdit,
  } = useEditableProject(activePage, activeProject, setActiveProject);

  return (
    <ProjectContext.Provider
      value={{
        activeProject: activeProject as Project,
        activePage,
        navigateBack,
        navigateForwards,
        resetPageHistory,
        handlePageNavigation,
        canNavigateBack,
        canNavigateForwards,
        mergeCurrentPageEdits,
        clearCurrentPageEdits,
        addEdit,
        activePageTilesWithEdits,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
