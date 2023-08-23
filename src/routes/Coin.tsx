import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { Fragment, useEffect, useState } from "react";
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

const DivContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #111;
  border-radius: 15px;
  padding: 20px;
`;

const ExplainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 16px;
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
  const { state } = useLocation() as RouteState; // from 'Home.tsx'
  const [info, setInfo] = useState<InfoData>();
  const [price, setPrice] = useState<PriceData>();
  /*
  ! 사용 시 각주 제거하기
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      console.log("infoData", infoData);
      console.log("priceData", priceData);
      setInfo(infoData);
      setPrice(priceData);
      setLoading(false);
    })();
  }, [coinId]);
  */

  return (
    <Container>
      <Header>
        <Title>{state?.name ?? ""}</Title>
      </Header>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <DivContainer>
            <ExplainDiv>
              <h1>RANK:</h1>
              <span>{info?.rank ?? "-"}</span>
            </ExplainDiv>
            <ExplainDiv>
              <h1>SYMBOL:</h1>
              <span>{`$${info?.symbol ?? " -"}`}</span>
            </ExplainDiv>
            <ExplainDiv>
              <h1>OPEN SOURCE:</h1>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </ExplainDiv>
          </DivContainer>
          <Description>{info?.description}</Description>
          <DivContainer>
            <ExplainDiv>
              <h1>TOTAL SUPPLY:</h1>
              <span>{price?.total_supply ?? "-"}</span>
            </ExplainDiv>
            <ExplainDiv>
              <h1>MAX SUPPLY:</h1>
              <span>{price?.max_supply ?? "-"}</span>
            </ExplainDiv>
          </DivContainer>
        </Fragment>
      )}
    </Container>
  );
}
