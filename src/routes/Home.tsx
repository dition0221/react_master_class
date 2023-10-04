import { useQuery } from "@tanstack/react-query";
import { styled } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
// Utilities
import { makeImagePath } from "./../utils";
import useWindowDimensions from "../components/useWindowDimensions";
// API & Interface
import { IGetMovieResult, getMovies } from "../api";
// Components
import Loader from "../components/Loader";
import Banner from "../components/Banner";
import InfoBox from "../components/InfoBox";

/* Styled */
const Wrapper = styled.main`
  background-color: black;
  padding-bottom: 200px;
  overflow: hidden;
`;

const Slider = styled.section`
  position: relative;
  top: -100px;
  /* calc((100% - (padding * 2) - (gap * 5)) / 6 / aspect-ratio) */
  padding-bottom: calc((100% - (60px * 2) - (5px * 5)) / 6 / (25 / 14));
`;

const SliderButton = styled(motion.button)`
  background-color: transparent;
  width: 55px; // gap: 5px
  height: 100%;
  position: absolute;
  border: none;
  font-size: 40px;
  fill: ${(props) => props.theme.white.lighter};
  cursor: pointer;
  z-index: 2;
`;

const Row = styled(motion.div)`
  width: 100%;
  padding: 0 60px;
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
`;

const Box = styled(motion.article)<{ $bgImg: string }>`
  aspect-ratio: 25/14;
  background-image: url(${(props) => props.$bgImg});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 3;
`;

const BigMovie = styled(motion.article)`
  position: fixed;
  width: 60vw;
  max-width: 850px;
  top: 30px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.darker};
  color: ${(props) => props.theme.white.lighter};
  z-index: 4;
  overflow: hidden;
`;

const BigImg = styled.img`
  background-size: cover;
  width: 100%;
  aspect-ratio: 25/14;
  display: block;
`;

const BigDescription = styled.div`
  padding: 30px 48px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
`;

const BigTitle = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 30px;
`;

const BigOverview = styled.p`
  font-size: 16px;
  line-height: 26px;
`;

/* Variants */
const rowVariants = (width: number) => ({
  normal: (isBack: boolean) => ({ x: isBack ? -width + 130 : width - 130 }),
  animate: { x: 0 },
  exit: (isBack: boolean) => ({ x: isBack ? width - 130 : -width + 130 }),
});

const boxVariants = {
  normal: { scale: 1, borderRadius: "6px" },
  hover: {
    scale: 1.3,
    y: -50,
    borderTopLeftRadius: "6px",
    borderTopRightRadius: "6px",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: { delay: 0.4, duration: 0.2, type: "tween" },
  },
};

const sliderButtonVariants = {
  init: { backgroundColor: "rgba(0,0,0,0)" },
  hover: { backgroundColor: "rgba(255,255,255,0.3)" },
};

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
  const [isBack, setIsBack] = useState(false); // Previous button
  const width = useWindowDimensions(); // width를 추적해, animation 최적화
  const offset = 6; // 하나의 row에 보여줄 영화의 갯수
  const totalMovies = data ? data.results.length - 1 : 0; // Except main movie
  const maxIndex = Math.floor(totalMovies / offset) - 1;
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const toggleIndex = (back: boolean) => {
    if (leaving) return; // 연속 클릭 방지
    if (data) {
      toggleLeaving();
      if (back) {
        setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
        setIsBack(true);
      } else setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const onSliderEnd = () => {
    toggleLeaving();
    setIsBack(false);
  };

  // Box clicked - Show modal box
  const navigate = useNavigate();
  const bigMovieMatch = useMatch("/movies/:movieId"); // Exist? Show modal box
  const onBoxClick = (movieId: number) => navigate(`/movies/${movieId}`);
  const onOverlayClick = () => navigate("/");
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => movie.id + "" === bigMovieMatch.params.movieId
    ); // Selected movie's information

  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Banner data={data} />

          <Slider>
            <AnimatePresence
              initial={false}
              onExitComplete={onSliderEnd}
              custom={isBack}
            >
              <SliderButton
                key="leftBtn"
                onClick={() => toggleIndex(true)}
                style={{
                  left: 0,
                  borderTopRightRadius: "6px",
                  borderBottomRightRadius: "6px",
                }}
                variants={sliderButtonVariants}
                initial="init"
                whileHover="hover"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 320 512"
                >
                  <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg>
              </SliderButton>
              <Row
                key={index}
                custom={isBack}
                variants={rowVariants(width)}
                initial="normal"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.7 }}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      key={movie.id}
                      variants={boxVariants}
                      whileHover="hover"
                      initial="normal"
                      transition={{ type: "tween" }}
                      onClick={() => onBoxClick(movie.id)}
                      $bgImg={makeImagePath(
                        movie.backdrop_path || movie.poster_path,
                        "w500"
                      )}
                    >
                      <InfoBox item={movie} />
                    </Box>
                  ))}
              </Row>
              <SliderButton
                key="rightBtn"
                onClick={() => toggleIndex(false)}
                style={{
                  right: 0,
                  borderTopLeftRadius: "6px",
                  borderBottomLeftRadius: "6px",
                }}
                variants={sliderButtonVariants}
                initial="init"
                whileHover="hover"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 320 512"
                >
                  <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                </svg>
              </SliderButton>
            </AnimatePresence>
          </Slider>

          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <BigMovie
                  layoutId={bigMovieMatch.params.movieId}
                  animate={{ borderRadius: "6px" }}
                >
                  {clickedMovie && (
                    <>
                      <BigImg src={makeImagePath(clickedMovie.backdrop_path)} />
                      <BigDescription>
                        <div>
                          <BigTitle>{clickedMovie.title}</BigTitle>
                          <BigOverview>
                            {clickedMovie.overview.length > 150
                              ? clickedMovie.overview.slice(0, 150) + "..."
                              : clickedMovie.overview}
                          </BigOverview>
                        </div>
                        <div>
                          {/* https://developer.themoviedb.org/reference/movie-details */}
                          {/* https://developer.themoviedb.org/reference/movie-credits */}
                          {/* https://developer.themoviedb.org/reference/movie-recommendations */}
                        </div>
                      </BigDescription>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
