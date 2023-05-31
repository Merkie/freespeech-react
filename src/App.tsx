import "./App.css";
import BottomNav from "./components/BottomNav";
import TilesDisplay from "./components/TilesDisplay";

function App() {
  return (
    <div className="app">
      <TilesDisplay />
      <BottomNav />
    </div>
  );
}

export default App;
