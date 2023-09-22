import { useQuery } from "@tanstack/react-query";
import { styled } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
// APIs
import { IGetMovieResult, getMovies } from "../api";
// Utilities
import { makeImagePath } from "./../utils";
import useWindowDimensions from "../components/useWindowDimensions";

/* Styled */
const Wrapper = styled.div`
  background-color: black;
  overflow-x: hidden;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ $bgImg: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgImg});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 20px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  width: 100%;
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
`;

const Box = styled(motion.div)<{ $bgImg: string }>`
  height: 200px;
  background-image: url(${(props) => props.$bgImg});
  background-size: cover;
  background-position: center center;
`;

/* Components */
export default function Home() {
  // Get movies from API
  const { isLoading, data } = useQuery<IGetMovieResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  // Slider
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false); // Animation동안 클릭 방지용
  const offset = 6; // 하나의 row에 보여줄 영화의 갯수
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const increaseIndex = () => {
    if (leaving) return; // 연속 클릭 방지
    if (data) {
      toggleLeaving();
      const totalMovies = data.results.length - 1; // Except main movie
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const width = useWindowDimensions(); // width를 추적해, animation 최적화

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            $bgImg={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                key={index}
                initial={{ x: width + 5 }}
                animate={{ x: 0 }}
                exit={{ x: -width - 5 }}
                transition={{ type: "tween", duration: 1 }}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      key={movie.id}
                      $bgImg={makeImagePath(movie.backdrop_path, "w500")}
                    />
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
}
