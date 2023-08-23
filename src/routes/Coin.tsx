import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
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
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  padding: 20px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 14px;
    margin-bottom: 10px;
  }
  span {
    font-size: 28px;
  }
`;

const Description = styled.p`
  font-size: 18px;
  margin: 30px 0;
  line-height: 110%;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 30px 0;
  gap: 10px;
`;

const Tab = styled.span<{ $isActive: boolean }>`
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  text-align: center;
  color: ${(props) =>
    props.$isActive ? props.theme.accentColor : props.theme.textColor};
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
  a {
    display: block;
    padding: 10px;
  }
`;

/* Interface */
interface RouteState {
  state: {
    name: string;
  };
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

export default function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams();
  const { state } = useLocation() as RouteState; // Data from 'Home.tsx'
  const [info, setInfo] = useState<InfoData>();
  const [price, setPrice] = useState<PriceData>();
  // useMatch
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  // fetch API
  // ! API 사용 시 각주 제거하기
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPrice(priceData);
      setLoading(false);
    })();
  }, [coinId]);

  return (
    <Container>
      <Header>
        <Title>{state?.name ? state.name : loading ? null : info?.name}</Title>
      </Header>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <h1>RANK:</h1>
              <span>{info?.rank ?? "-"}</span>
            </OverviewItem>
            <OverviewItem>
              <h1>SYMBOL:</h1>
              <span>{`$${info?.symbol ?? " -"}`}</span>
            </OverviewItem>
            <OverviewItem>
              <h1>OPEN SOURCE:</h1>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <h1>TOTAL SUPPLY:</h1>
              <span>{price?.total_supply ?? "-"}</span>
            </OverviewItem>
            <OverviewItem>
              <h1>MAX SUPPLY:</h1>
              <span>{price?.max_supply ?? "-"}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab $isActive={chartMatch !== null}>
              <Link to={"chart"}>CHART</Link>
            </Tab>
            <Tab $isActive={priceMatch !== null}>
              <Link to={"price"}>PRICE</Link>
            </Tab>
          </Tabs>

          <Outlet />
        </>
      )}
    </Container>
  );
}
