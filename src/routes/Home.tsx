import { useQuery } from "@tanstack/react-query";
import { styled } from "styled-components";
import { AnimatePresence } from "framer-motion";
import { Outlet, useMatch } from "react-router-dom";
// API & Interface
import {
  IGetRecommendAndTrend,
  IGetMovieResult,
  getMovies,
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
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

/* Components */
export default function Home() {
  // API
  const { isLoading, data } = useQuery<IGetMovieResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const { data: trendingMovieData } = useQuery<IGetRecommendAndTrend>(
    ["movies", "trending"],
    getTrendingMovies
  );
  const { data: topRatedMovieData } = useQuery<IGetRecommendAndTrend>(
    ["movies", "topRated"],
    getTopRatedMovies
  );
  const { data: popularMovieData } = useQuery<IGetRecommendAndTrend>(
    ["movies", "popular"],
    getPopularMovies
  );
  const { data: upcomingMovieData } = useQuery<IGetMovieResult>(
    ["movies", "upcoming"],
    getUpcomingMovies
  );

  // Box clicked - Show modal box
  const bigMovieMatch = useMatch("/movie/:movieId"); // Exist? Show modal box

  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Banner data={data} mediaType="movie" />

          <Slider
            sliderTitle="현재 상영 중인 영화"
            data={data}
            isBanner
            mediaType="movie"
          />
          <Slider
            sliderTitle="지금 뜨는 영화"
            data={trendingMovieData}
            mediaType="movie"
          />
          <Slider
            sliderTitle="평단의 찬사를 받은 영화"
            data={topRatedMovieData}
            mediaType="movie"
          />
          <Slider
            sliderTitle="상영 예정 영화"
            data={upcomingMovieData}
            mediaType="movie"
          />
          <Slider
            sliderTitle="인기 영화"
            data={popularMovieData}
            mediaType="movie"
          />

          {/* 영화 클릭 시 정보 보여주기 */}
          <AnimatePresence>{bigMovieMatch ? <Outlet /> : null}</AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
