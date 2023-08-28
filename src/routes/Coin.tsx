import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
// Components
import Loader from "../components/Loader";
// API
import { fetchCoinInfo, fetchCoinTickers } from "../api";

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
  @media screen and (max-width: 400px) {
    flex-direction: column;
    div:not(:last-child) {
      margin-bottom: 20px;
    }
  }
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
    font-size: 21px;
  }
  @media screen and (max-width: 475px) {
    h1 {
      font-size: 14px;
    }
    span {
      font-size: 18px;
    }
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
    background-color: rgba(0, 0, 0, 0.8);
  }
  a {
    display: block;
    padding: 10px;
  }
`;

/* Interface */
interface IRouteState {
  state: {
    name: string;
  };
}

interface IInfoData {
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

interface ITickersData {
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
  // parameter
  const { coinId } = useParams();
  const { state } = useLocation() as IRouteState; // Data from 'Home.tsx'
  // useMatch
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  // Fetch API (React-Query)
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } =
    useQuery<ITickersData>(["tickers", coinId], () => fetchCoinTickers(coinId));
  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? null : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <h1>RANK:</h1>
              <span>{infoData?.rank ?? "-"}</span>
            </OverviewItem>
            <OverviewItem>
              <h1>SYMBOL:</h1>
              <span>{`$${infoData?.symbol ?? " -"}`}</span>
            </OverviewItem>
            <OverviewItem>
              <h1>OPEN SOURCE:</h1>
              <span>{infoData?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <h1>TOTAL SUPPLY:</h1>
              <span>{tickersData?.total_supply ?? "-"}</span>
            </OverviewItem>
            <OverviewItem>
              <h1>MAX SUPPLY:</h1>
              <span>{tickersData?.max_supply ?? "-"}</span>
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

          <Outlet context={{ coinId }} />
        </>
      )}
    </Container>
  );
}
