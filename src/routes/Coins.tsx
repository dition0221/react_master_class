import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useRecoilValue, useSetRecoilState } from "recoil";
// API
import { fetchCoins } from "../api";
// Atom
import { isDarkAtom } from "../atoms";
// Components
import Loader from "../components/Loader";

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
  position: relative;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  font-size: 30px;
  background-color: ${(props) => props.theme.bgColor};
  border: 2px solid ${(props) => props.theme.textColor};
  box-shadow: 0 0 3px ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 15px;
  transition: all 0.3s ease-in-out;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.3s ease-in-out;
    @media screen and (max-width: 400px) {
      font-size: 7.5vw;
    }
  }
  &:hover {
    transform: scale(1.1);
    background-color: ${(props) => props.theme.textColor};
    border-color: ${(props) => props.theme.accentColor};
    box-shadow: 0 0 3px ${(props) => props.theme.accentColor};
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

const ThemeBtn = styled.button`
  width: 40px;
  height: 40px;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 15px;
  margin-top: 10px;
  border: 2px solid ${(props) => props.theme.textColor};
  border-radius: 5px;
  box-shadow: 0 0 5px ${(props) => props.theme.textColor};
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.bgColor};
    border-color: ${(props) => props.theme.accentColor};
    box-shadow: 0 0 10px ${(props) => props.theme.accentColor};
    transform: scale(1.2);
  }
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
  // Theme
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  // Fetch API (React-Query)
  const { isLoading, data } = useQuery<ICoins[]>(["allCoins"], fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>Crypto | dition0221</title>
      </Helmet>

      <Header>
        <Title>Crypto</Title>
        <ThemeBtn onClick={toggleDarkAtom}>
          {isDark ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-moon"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-sun"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </ThemeBtn>
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
