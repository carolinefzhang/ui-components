import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Countdown from "./pages/Countdown";
import Checkout from "./pages/Checkout";
import Sudoku from "./pages/Sudoku";
import InteractiveBox from "./pages/InteractiveBox";
import Recipe from "./pages/Recipe";
import Memepage from "./pages/Meme";
import Tenzies from "./pages/Tenzies";
import Endgame from "./pages/Endgame";
import Stock from "./pages/Stock";
import PageLayout from "./components/PageLayout";

function App() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route index element={<Home />} />
        <Route
          path="count-down"
          element={<Countdown size={200} totalTime={30} color="red" />}
        />
        <Route path="check-out" element={<Checkout />} />
        <Route path="sudoku" element={<Sudoku />} />
        <Route path="interactive-box" element={<InteractiveBox />} />
        <Route path="recipe" element={<Recipe />} />
        <Route path="meme-generator" element={<Memepage />} />
        <Route path="tenzies" element={<Tenzies />} />
        <Route path="assembly-endgame" element={<Endgame />} />
        <Route path="stock" element={<Stock />} />
      </Route>
    </Routes>
  );
}

export default App;
