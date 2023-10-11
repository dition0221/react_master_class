import { useQuery } from "@tanstack/react-query";
import { styled } from "styled-components";
import { AnimatePresence } from "framer-motion";
import { Outlet, useMatch } from "react-router-dom";
// API & Interface
import { IGetMovieResult, getMovies } from "../api";
// Components
import Loader from "../components/Loader";
import Banner from "../components/Banner";
import Slider from "../components/Slider";

/* Styled */
const Wrapper = styled.main`
  background-color: black;
  padding-bottom: 200px;
  overflow: hidden;
`;

/* Components */
export default function Home() {
  // Get movies from API
  const { isLoading, data } = useQuery<IGetMovieResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  // Box clicked - Show modal box
  const bigMovieMatch = useMatch("/movies/:movieId"); // Exist? Show modal box

  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Banner data={data} />

          <Slider data={data} />

          {/* 영화 클릭 시 정보 보여주기 */}
          <AnimatePresence>{bigMovieMatch ? <Outlet /> : null}</AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
