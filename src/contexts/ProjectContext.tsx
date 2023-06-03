import { ReactElement, createContext, useEffect, useState } from "react";
import { Page, Project, ProjectEdits, Tile } from "../utils/types";
import english from "../utils/layouts/english";
import usePageNavigation from "../hooks/usePageNavigation";
import { useLocalStorage } from "react-use";

export const ProjectContext = createContext<{
  activeProject: Project;
  activePage: Page;
  navigateBack: () => void;
  navigateForwards: () => void;
  resetPageHistory: () => void;
  handlePageNavigation: (pageName: string) => void;
  activePageTilesWithEdits: Tile[];
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
  activePageTilesWithEdits: [],
  mergeCurrentPageEdits: () => null,
  clearCurrentPageEdits: () => null,
  addEdit: () => null,
  canNavigateBack: false,
  canNavigateForwards: false,
});

export const ProjectProvider = ({ children }: { children: ReactElement }) => {
  const [activeProject, setActiveProject] = useLocalStorage<Project>(
    "freespeech-project",
    english
  );
  const [activePage, setActivePage] = useState<Page>(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    activeProject!.pages.find((page) => page.name === "home")!
  );
  const [projectEdits, setProjectEdits] = useLocalStorage<ProjectEdits>(
    "freespeech-project-edits",
    { pages: [] }
  );
  const [activePageTilesWithEdits, setActivePageTilesWithEdits] = useState<
    Tile[]
  >(activePage.tiles);
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

  const mergeCurrentPageEdits = () => {
    if (!activePage || !activeProject || !activePageTilesWithEdits) return;

    setActiveProject({
      ...activeProject,
      pages: (activeProject as Project).pages.map((page) =>
        page.name === activePage.name
          ? { ...page, tiles: activePageTilesWithEdits }
          : page
      ) as Page[],
    } as Project);
  };

  const clearCurrentPageEdits = () => {
    setProjectEdits((prev) => {
      if (!prev) return prev;
      const newPages = prev.pages.filter(
        (page) => page.name !== activePage?.name
      );
      return { ...prev, pages: newPages };
    });
  };

  const addEdit = (tileToEdit: Tile) => {
    if (!projectEdits) return projectEdits;
    const pageName = pageHistory[pageIndex];

    // Check if the page exists, if not, add it
    let pageToEdit = projectEdits.pages.find((page) => page.name === pageName);
    if (!pageToEdit) {
      pageToEdit = { name: pageName, tiles: [] };
      projectEdits.pages.push(pageToEdit);
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

    setProjectEdits({
      ...projectEdits,
      pages: projectEdits.pages.map((page) =>
        page.name === pageToEdit?.name ? pageToEdit : page
      ),
    });

    // Merge the edits with the active page into its own state variable
    let merged = [...activePage.tiles];
    const pageEdits = projectEdits.pages.find(
      (page) => page.name === activePage.name
    );

    pageEdits?.tiles.forEach((edit) => {
      const existingTile = merged.find(
        (tile) =>
          tile.x === edit.x &&
          tile.y === edit.y &&
          tile.subpageIndex === edit.subpageIndex
      );

      if (existingTile) {
        merged = merged.filter((tile) => tile !== existingTile);
      }

      merged.push(edit);
    });

    setActivePageTilesWithEdits(merged);
  };

  useEffect(() => {
    if (!activeProject) return;
    const page = activeProject.pages.find(
      (page) => page.name === pageHistory[pageIndex]
    );
    if (!page) return;
    setActivePage(page);
  }, [pageIndex, activeProject, pageHistory, setActivePage]);

  return (
    <ProjectContext.Provider
      value={{
        activeProject: activeProject as Project,
        activePage,
        navigateBack,
        navigateForwards,
        resetPageHistory,
        handlePageNavigation,
        activePageTilesWithEdits,
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
