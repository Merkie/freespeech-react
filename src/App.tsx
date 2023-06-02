import BottomNav from "./components/BottomNav";
import useModalManager from "./hooks/useModalManager";
import { AppModeProvider } from "./contexts/AppModeContext";
import { PageProvider } from "./contexts/PageContext";
import { SpeechProvider } from "./contexts/SpeechContext";
import MainApplication from "./components/MainApplication";

function App() {
  const { renderModal, setModal } = useModalManager();

  return (
    <AppModeProvider>
      <SpeechProvider>
        <PageProvider>
          <div className="app">
            {renderModal()}
            <MainApplication />
            <BottomNav setModal={setModal} />
          </div>
        </PageProvider>
      </SpeechProvider>
    </AppModeProvider>
  );
}

export default App;
