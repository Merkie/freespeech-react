import { ReactElement, createContext, useEffect, useState } from "react";
import {
  AppMode,
  EditModeTool,
  Page,
  Project,
  ProjectEdits,
  Tile,
} from "../utils/types";
import english from "../utils/layouts/english";
import usePageNavigation from "../hooks/usePageNavigation";

export const ProjectContext = createContext<{
  activeProject: Project;
  activePage: Page;
  navigateBack: () => void;
  navigateForwards: () => void;
  resetPageHistory: () => void;
  handlePageNavigation: (pageName: string) => void;
  getCurrentPageWithEdits: () => Page;
  mergeCurrentPageEdits: () => void;
  clearCurrentPageEdits: () => void;
  addEdit: (tileToEdit: Tile) => void;
  canNavigateBack: boolean;
  canNavigateForwards: boolean;
}>({
  activeProject: english,
  activePage: english.pages[0],
  navigateBack: () => null,
  navigateForwards: () => null,
  resetPageHistory: () => null,
  handlePageNavigation: () => null,
  getCurrentPageWithEdits: () => english.pages[0],
  mergeCurrentPageEdits: () => null,
  clearCurrentPageEdits: () => null,
  addEdit: () => null,
  canNavigateBack: false,
  canNavigateForwards: false,
});

export const ProjectProvider = ({ children }: { children: ReactElement }) => {
  const [activeProject, setActiveProject] = useState<Project>(
    JSON.parse(
      localStorage.getItem("freespeech-project") || JSON.stringify(english)
    )
  );
  const [activePage, setActivePage] = useState<Page>(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    activeProject.pages.find((page) => page.name === "home")!
  );
  const [projectEdits, setProjectEdits] = useState<ProjectEdits>(
    JSON.parse(
      localStorage.getItem("freespeech-project-edits") || '{"pages": []}'
    )
  );

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

  const getCurrentPageWithEdits = () => {
    const pageEdits = projectEdits.pages.find(
      (page) => page.name === activePage.name
    );
    console.log(pageEdits);
    return pageEdits
      ? { ...activePage, tiles: [...activePage.tiles, ...pageEdits.tiles] }
      : activePage;
  };

  const mergeCurrentPageEdits = () => {
    const mergedTiles = getCurrentPageWithEdits().tiles;
    setActiveProject({
      ...activeProject,
      pages: activeProject.pages.map((page) =>
        page.name === activePage.name ? { ...page, tiles: mergedTiles } : page
      ),
    });
  };

  const clearCurrentPageEdits = () => {
    setProjectEdits({
      ...projectEdits,
      pages: {
        ...projectEdits.pages,
        [activePage.name]: { tiles: [] },
      },
    });
  };

  const addEdit = (tileToEdit: Tile) => {
    const pageName = pageHistory[pageIndex];
    setProjectEdits((previousEdits) => {
      // Check if the page exists, if not, add it
      let pageToEdit = previousEdits.pages.find(
        (page) => page.name === pageName
      );
      if (!pageToEdit) {
        pageToEdit = { name: pageName, tiles: [] };
        previousEdits.pages.push(pageToEdit);
      }

      // Check if the tile exists in the page
      const existingTileIndex = pageToEdit.tiles.findIndex(
        (tile) =>
          tile.x === tileToEdit.x &&
          tile.y === tileToEdit.y &&
          tile.subpageIndex === tileToEdit.subpageIndex
      );

      // If the tile exists, merge it with the new tile; otherwise add the new tile
      if (existingTileIndex !== -1) {
        const existingTile = pageToEdit.tiles[existingTileIndex];
        pageToEdit.tiles[existingTileIndex] = {
          ...existingTile,
          ...tileToEdit,
        };
      } else {
        pageToEdit.tiles.push(tileToEdit);
      }

      return { ...previousEdits };
    });
  };

  useEffect(() => {
    localStorage.setItem("freespeech-project", JSON.stringify(activeProject));
  }, [activeProject]);

  useEffect(() => {
    localStorage.setItem(
      "freespeech-project-edits",
      JSON.stringify(projectEdits)
    );
  }, [projectEdits]);

  useEffect(() => {
    setActivePage(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      activeProject.pages.find((page) => page.name === pageHistory[pageIndex])!
    );
  }, [pageIndex, activeProject, pageHistory]);

  return (
    <ProjectContext.Provider
      value={{
        activeProject,
        activePage,
        navigateBack,
        navigateForwards,
        resetPageHistory,
        handlePageNavigation,
        getCurrentPageWithEdits,
        mergeCurrentPageEdits,
        clearCurrentPageEdits,
        addEdit,
        canNavigateBack,
        canNavigateForwards,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
