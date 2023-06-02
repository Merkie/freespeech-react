import { useContext } from "react";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";
import { PageContext } from "../contexts/PageContext";

const TilesTopNav = () => {
  const { navigateBack, navigateForwards, pageIndex, pageHistory } =
    useContext(PageContext);
  return (
    <div className="tiles-top-nav">
      <button
        disabled={pageIndex === pageHistory.length - 1}
        onClick={navigateBack}
      >
        <ArrowLeft />
      </button>
      <p>{pageHistory[pageIndex]}</p>
      <button disabled={pageIndex === 0} onClick={navigateForwards}>
        <ArrowRight />
      </button>
    </div>
  );
};
export default TilesTopNav;
