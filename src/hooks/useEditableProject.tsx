import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { Page, Project, ProjectEdits, Tile } from "../utils/types";

function useEditableProject(
  activePage: Page,
  activeProject: Project | undefined,
  setActiveProject: (project: Project) => void
) {
  const [projectEdits, setProjectEdits] = useLocalStorage<ProjectEdits>(
    "freespeech-project-edits",
    { pages: [] }
  );
  const [activePageTilesWithEdits, setActivePageTilesWithEdits] = useState<
    Tile[]
  >(activePage.tiles);

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
    // Check if the page exists, if not, add it
    let pageToEdit = projectEdits.pages.find(
      (page) => page.name === activePage.name
    );
    if (!pageToEdit) {
      pageToEdit = { name: activePage.name, tiles: [] };
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
