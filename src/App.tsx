import "./App.css";
import BottomNav from "./components/BottomNav";
import TilesDisplay from "./components/TilesDisplay";
import TilesTopNav from "./components/TilesTopNav";
import english from "./utils/layouts/english";
import { useState } from "react";

function App() {
  const [pageHistory, setPageHistory] = useState<string[]>(["home"]);
  const [pageIndex, setPageIndex] = useState(0);
  const [speaking, setSpeaking] = useState(false);

  const handlePageNavigation = (pageName: string) => {
    if (pageIndex === 0) {
      setPageHistory([pageName, ...pageHistory]);
      return;
    }
    setPageHistory([
      pageName,
      ...pageHistory.slice(pageIndex, pageHistory.length),
    ]);
    setPageIndex(0);
  };

  const navigateBack = () => {
    if (pageIndex === pageHistory.length - 1) return;
    setPageIndex(pageIndex + 1);
  };

  const navigateForwards = () => {
    if (pageIndex === 0) return;
    setPageIndex(pageIndex - 1);
  };

  const resetPageHistory = () => {
    setPageHistory(["home"]);
    setPageIndex(0);
  };

  const speak = (text: string) => {
    if (speaking) return;
    setSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
    utterance.onend = () => {
      setSpeaking(false);
    };
  };

  return (
    <div className="app">
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
      <BottomNav resetPageHistory={resetPageHistory} />
    </div>
  );
}

export default App;
