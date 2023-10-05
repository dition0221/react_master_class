import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import Home from "./routes/Home";
import Tv from "./routes/Tv";
import Search from "./routes/Search";
import Header from "./components/Header";
import ClickedItem from "./routes/ClickedItem";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/movies/:movieId" element={<ClickedItem />} />
        </Route>
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
        <Route path="/*" element={<span>Error: 404</span>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
