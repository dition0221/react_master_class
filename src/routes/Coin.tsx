import { useParams } from "react-router-dom";

export default function Coin() {
  const { coinId } = useParams();
  console.log(coinId);
  return <div>Coin: {coinId}</div>;
}
