import { BrowserRouter, Routes, Route } from "react-router-dom";
// Routes
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
// Nested Routes
import Chart from "./routes/Chart";
import Price from "./routes/Price";
import Loader from "./components/Loader";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinId" element={<Coin />}>
          <Route path="chart" element={<Chart />} />
          <Route path="price" element={<Price />} />
        </Route>
        <Route path="/*" element={<Loader text="404: Not Found" />} />
      </Routes>
    </BrowserRouter>
  );
}
