import { BrowserRouter, Routes, Route } from "react-router-dom";
// Routes
import Home from "./routes/Home";
import Tv from "./routes/Tv";
import Search from "./routes/Search";
// Nested Routes
import ClickedMovie from "./routes/ClickedMovie";
import ClickedTv from "./routes/ClickedTv";
// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="movie/:movieId" element={<ClickedMovie />} />
        </Route>
        <Route path="/tv" element={<Tv />}>
          <Route path=":tvId" element={<ClickedTv />} />
        </Route>
        <Route path="/search" element={<Search />}>
          <Route path="movie/:movieId" element={<ClickedMovie />} />
          <Route path="tv/:tvId" element={<ClickedTv />} />
        </Route>
        <Route path="/*" element={<span>Error: 404</span>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
