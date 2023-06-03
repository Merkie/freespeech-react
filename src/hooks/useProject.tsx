import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { Page, Project } from "../utils/types";
import english from "../utils/layouts/english";

function useProject(activePageName: string) {
  const [activeProject, setActiveProject] = useLocalStorage<Project>(
    "freespeech-project",
    english
  );
  const [activePage, setActivePage] = useState<Page>(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    activeProject!.pages.find((page) => page.name === "home")!
  );

  useEffect(() => {
    if (!activeProject) return;
    const page = activeProject.pages.find(
      (page) => page.name === activePageName
    );
    if (!page) return;
    setActivePage(page);
  }, [activePageName, activeProject, setActivePage]);

  return {
    activeProject,
    setActiveProject,
    activePage,
  };
}

export default useProject;
