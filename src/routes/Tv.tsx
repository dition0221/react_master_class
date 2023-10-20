import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { Outlet, useMatch } from "react-router-dom";
// APIs
import {
  IGetRecommendAndTrend,
  IGetTvTopRated,
  getTrendingTv,
  getTopRatedTv,
  getOnTheAirTv,
} from "../api";
// Components
import Loader from "../components/Loader";
import Banner from "../components/Banner";
import Slider from "../components/Slider";
import { Helmet } from "react-helmet-async";

/* Styled */
const Wrapper = styled.main`
  background-color: black;
  padding-bottom: 100px;
  overflow: hidden;
`;

export default function Tv() {
  // API
  const { data: trendingTvData } = useQuery<IGetRecommendAndTrend>(
    ["TVS", "trending"],
    getTrendingTv
  );
  const { isLoading, data: topRated } = useQuery<IGetTvTopRated>(
    ["TVS", "topRated"],
    getTopRatedTv
  );
  const { data: onTheAirTvData } = useQuery<IGetRecommendAndTrend>(
    ["TVS", "onTheAir"],
    getOnTheAirTv
  );

  // Box clicked - Show modal box
  const bigTvMatch = useMatch("/tv/:itemId"); // Exist? Show modal box

  return (
    <Wrapper>
      <Helmet>
        <title>TV쇼 - 넷플릭스</title>
      </Helmet>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Banner data={trendingTvData} mediaType="tv" />

          <Slider
            sliderTitle="지금 뜨는 TV 프로그램"
            data={trendingTvData}
            isBanner
            mediaType="tv"
          />
          <Slider
            sliderTitle="최고 시청률 TV 프로그램"
            data={topRated}
            mediaType="tv"
          />
          <Slider
            sliderTitle="현재 방영 중인 TV 프로그램"
            data={onTheAirTvData}
            mediaType="tv"
          />

          {/* TV 클릭 시 정보 보여주기 */}
          <AnimatePresence>{bigTvMatch ? <Outlet /> : null}</AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
