import "./App.css";
import BottomNav from "./components/BottomNav";
import TilesDisplay from "./components/TilesDisplay";
import english from "./utils/layouts/english";
import { useState } from "react";

function App() {
  const [pageHistory, setPageHistory] = useState<string[]>(["home"]);
  const [pageIndex, setPageIndex] = useState(0);

  const handlePageNavigation = (pageName: string) => {
    setPageHistory([pageName, ...pageHistory]);
  };

  const resetPageHistory = () => {
    setPageHistory(["home"]);
    setPageIndex(0);
  };

  return (
    <div className="app">
      <TilesDisplay
        pageTiles={
          english.pages.find((page) => page.name === pageHistory[pageIndex])
            ?.tiles || []
        }
        handlePageNavigation={handlePageNavigation}
      />
      <BottomNav resetPageHistory={resetPageHistory} />
    </div>
  );
}

export default App;
