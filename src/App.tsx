import "./App.css";
import BottomNav from "./components/BottomNav";
import TilesDisplay from "./components/TilesDisplay";
import { Tile } from "./utils/types";

function App() {
  const pageTiles: Tile[] = [
    {
      x: 0,
      y: 0,
      subpageIndex: 0,
      text: "Hello!",
      image:
        "https://images.theconversation.com/files/393210/original/file-20210401-13-z6rl6z.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop",
    },
    {
      x: 1,
      y: 0,
      subpageIndex: 0,
      text: "World!",
    },
  ];

  return (
    <div className="app">
      <TilesDisplay pageTiles={pageTiles} />
      <BottomNav />
    </div>
  );
}

export default App;
