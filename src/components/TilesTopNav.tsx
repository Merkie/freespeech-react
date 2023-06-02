import { useContext } from "react";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";
import { ProjectContext } from "../contexts/ProjectContext";

const TilesTopNav = () => {
  const {
    activePage,
    canNavigateBack,
    navigateBack,
    canNavigateForwards,
    navigateForwards,
  } = useContext(ProjectContext);
  return (
    <div className="tiles-top-nav">
      <button disabled={canNavigateBack} onClick={navigateBack}>
        <ArrowLeft />
      </button>
      <p>{activePage.name}</p>
      <button disabled={canNavigateForwards} onClick={navigateForwards}>
        <ArrowRight />
      </button>
    </div>
  );
};
export default TilesTopNav;
