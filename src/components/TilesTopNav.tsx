import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";

const TilesTopNav = (props: {
  navigateBack: () => void;
  navigateForwards: () => void;
  pageIndex: number;
  pageHistory: string[];
}) => {
  return (
    <div className="tiles-top-nav">
      <button
        disabled={props.pageIndex === props.pageHistory.length - 1}
        onClick={props.navigateBack}
      >
        <ArrowLeft />
      </button>
      <p>{props.pageHistory[props.pageIndex]}</p>
      <button disabled={props.pageIndex === 0} onClick={props.navigateForwards}>
        <ArrowRight />
      </button>
    </div>
  );
};
export default TilesTopNav;
