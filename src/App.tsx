import BottomNav from "./components/BottomNav";
import TilesDisplay from "./components/TilesDisplay";
import TilesTopNav from "./components/TilesTopNav";
import english from "./utils/layouts/english";
import usePageNavigation from "./hooks/usePageNavigation";
import useSpeech from "./hooks/useSpeech";
import useModalManager from "./hooks/useModalManager";

function App() {
  const {
    pageHistory,
    pageIndex,
    handlePageNavigation,
    navigateBack,
    navigateForwards,
    resetPageHistory,
  } = usePageNavigation("home");

  const speak = useSpeech();

  const { renderModal, setModal } = useModalManager();

  return (
    <div className="app">
      {renderModal()}
      <TilesTopNav
        navigateBack={navigateBack}
        navigateForwards={navigateForwards}
        pageIndex={pageIndex}
        pageHistory={pageHistory}
      />
      <TilesDisplay
        pageTiles={
          english.pages.find((page) => page.name === pageHistory[pageIndex])
            ?.tiles || []
        }
        handlePageNavigation={handlePageNavigation}
        speak={speak}
      />
      <BottomNav setModal={setModal} resetPageHistory={resetPageHistory} />
    </div>
  );
}

export default App;
