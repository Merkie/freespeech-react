import { AppModeProvider } from "./contexts/AppModeContext";
import { ProjectProvider } from "./contexts/ProjectContext";
import { SpeechProvider } from "./contexts/SpeechContext";
import { UserProvider } from "./contexts/UserContext";
import { ModalProvider } from "./contexts/ModalContext";
import MainApplication from "./components/MainApplication";
import BottomNav from "./components/BottomNav";

function App() {
  return (
    <ModalProvider>
      <UserProvider>
        <AppModeProvider>
          <SpeechProvider>
            <ProjectProvider>
              <div className="app">
                <MainApplication />
                <BottomNav />
              </div>
            </ProjectProvider>
          </SpeechProvider>
        </AppModeProvider>
      </UserProvider>
    </ModalProvider>
  );
}

export default App;
