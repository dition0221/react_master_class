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

/* Styled */
const Wrapper = styled.main`
  background-color: black;
  padding-bottom: 100px;
  overflow: hidden;
`;

export default function Tv() {
  // API
  const { data: trendingTvData } = useQuery<IGetRecommendAndTrend>(
    ["tv", "trending"],
    getTrendingTv
  );
  const { isLoading, data: topRated } = useQuery<IGetTvTopRated>(
    ["tv", "topRated"],
    getTopRatedTv
  );
  const { data: onTheAirTvData } = useQuery<IGetRecommendAndTrend>(
    ["tv", "onTheAir"],
    getOnTheAirTv
  );

  // Box clicked - Show modal box
  const bigMovieMatch = useMatch("/tv/:tvId"); // Exist? Show modal box

  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Banner data={trendingTvData} />

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

          {/* 영화 클릭 시 정보 보여주기 */}
          <AnimatePresence>{bigMovieMatch ? <Outlet /> : null}</AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
