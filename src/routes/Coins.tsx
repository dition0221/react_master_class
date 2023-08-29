import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
// Components
import Loader from "../components/Loader";
// API
import { fetchCoins } from "../api";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: whitesmoke;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 15px;
  border-radius: 15px;
  font-size: 30px;
  transition: transform 0.3s ease-in-out;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
    @media screen and (max-width: 400px) {
      font-size: 7.5vw;
    }
  }
  &:hover {
    transform: translateY(-5px);
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  @media screen and (max-width: 400px) {
    font-size: 12.4vw;
  }
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

/* Interface */
interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export default function Coins() {
  // Fetch API (React-Query)
  const { isLoading, data } = useQuery<ICoins[]>(["allCoins"], fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>Crypto | dition0221</title>
      </Helmet>

      <Header>
        <Title>Cryptocurrency</Title>
      </Header>
      {isLoading ? (
        <Loader />
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
