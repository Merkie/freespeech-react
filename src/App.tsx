import BottomNav from "./components/BottomNav";
import useModalManager from "./hooks/useModalManager";
import { AppModeProvider } from "./contexts/AppModeContext";
import { PageProvider } from "./contexts/PageContext";
import { SpeechProvider } from "./contexts/SpeechContext";
import MainApplication from "./components/MainApplication";
import { UserProvider } from "./contexts/UserProvider";

function App() {
  const { renderModal, setOpenModal } = useModalManager();

  return (
    <UserProvider>
      <AppModeProvider>
        <SpeechProvider>
          <PageProvider>
            <div className="app">
              {renderModal()}
              <MainApplication />
              <BottomNav setOpenModal={setOpenModal} />
            </div>
          </PageProvider>
        </SpeechProvider>
      </AppModeProvider>
    </UserProvider>
  );
}

export default App;
