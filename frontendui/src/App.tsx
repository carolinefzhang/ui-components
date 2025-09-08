import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Homepage from "./pages/Homepage";
import Countdown from "./components/Countdown";
import Checkout from "./components/Checkout";
import Sudoku from "./components/Sudoku";
import InteractiveBox from "./components/InteractiveBox";
import Recipepage from "./pages/Recipepage";
import Memepage from "./pages/Memepage";
import Tenziespage from "./pages/Tenziespage";
import Endgamepage from "./pages/Endgamepage";
import Header from "./components/Header";

function App() {
  return (
    <Box minH={"100vh"}>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/count-down"
          element={<Countdown size={200} totalTime={30} color="red" />}
        />
        <Route path="/check-out" element={<Checkout />} />
        <Route path="/sudoku" element={<Sudoku />} />
        <Route path="/interactive-box" element={<InteractiveBox />} />
        <Route path="/recipe" element={<Recipepage />} />
        <Route path="/meme-generator" element={<Memepage />} />
        <Route path="/tenzies" element={<Tenziespage />} />
        <Route path="/assembly-endgame" element={<Endgamepage />} />
      </Routes>
    </Box>
  );
}

export default App;
