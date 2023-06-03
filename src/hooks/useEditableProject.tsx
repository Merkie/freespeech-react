import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { Page, Project, ProjectEdits, Tile } from "../utils/types";

function useEditableProject(
  activePage: Page,
  activeProject: Project | undefined,
  setActiveProject: (project: Project) => void
) {
  const [projectEdits, setProjectEdits] = useState<ProjectEdits>({ pages: [] });
  const [activePageTilesWithEdits, setActivePageTilesWithEdits] = useState<
    Tile[]
  >(activePage.tiles);

  const mergeCurrentPageEdits = () => {
    if (!activeProject) return;

    const newProject = { ...activeProject };
    newProject.pages = newProject.pages.map((page) =>
      page.name === activePage.name
        ? { ...page, tiles: activePageTilesWithEdits }
        : page
    );

    setActiveProject(newProject);
  };

  const clearCurrentPageEdits = () => {
    setProjectEdits((prev) => ({
      ...prev,
      pages: prev?.pages.filter((page) => page.name !== activePage.name),
    }));
  };

  const mergeEditsWithEditsPage = () => {
    const merged = [...activePage.tiles];
    const pageEdits = projectEdits?.pages.find(
      (page) => page.name === activePage.name
    );

    pageEdits?.tiles.forEach((edit) => {
      const existingTileIndex = merged.findIndex(
        (tile) =>
          tile.x === edit.x &&
          tile.y === edit.y &&
          tile.subpageIndex === edit.subpageIndex
      );

      if (existingTileIndex !== -1) {
        merged[existingTileIndex] = edit;
      } else {
        merged.push(edit);
      }
    });

    setActivePageTilesWithEdits(merged);
  };

  const addEdit = (tileToEdit: Tile) => {
    setProjectEdits((prev) => {
      const newPages = [...prev.pages];
      let pageToEdit = newPages.find((page) => page.name === activePage.name);

      if (!pageToEdit) {
        pageToEdit = { name: activePage.name, tiles: [] };
        newPages.push(pageToEdit);
      }

      const existingTileIndex = pageToEdit.tiles.findIndex(
        (tile) =>
          tile.x === tileToEdit.x &&
          tile.y === tileToEdit.y &&
          tile.subpageIndex === tileToEdit.subpageIndex
      );

      if (existingTileIndex !== -1) {
        pageToEdit.tiles[existingTileIndex] = tileToEdit;
      } else {
        pageToEdit.tiles.push(tileToEdit);
      }

      return {
        ...prev,
        pages: newPages.map((page) =>
          page.name === pageToEdit?.name ? pageToEdit : page
        ),
      };
    });

    mergeEditsWithEditsPage();
  };

  useEffect(() => {
    setActivePageTilesWithEdits(activePage.tiles);
  }, [activePage]);

  return {
    mergeCurrentPageEdits,
    clearCurrentPageEdits,
    activePageTilesWithEdits,
    addEdit,
  };
}

export default useEditableProject;
