import { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// Interface & API
import { IGetRecommendAndTrend, IGetMovieResult, IGetTvTopRated } from "../api";
// Utilities
import useWindowDimensions from "./useWindowDimensions";
import { makeImagePath } from "../utils";
// Components
import InfoBox from "./InfoBox";

/* Styled */
const Title = styled.h1`
  font-size: 1.4vw;
  font-weight: 500;
  padding-left: 60px;
  margin-bottom: 20px;
`;

const SliderWrapper = styled.section`
  position: relative;
  /* calc((100% - (padding * 2) - (gap * 5)) / numberOf<Box> / aspect-ratio) */
  padding-bottom: calc((100% - (60px * 2) - (5px * 5)) / 6 / (25 / 14));
  margin-bottom: 3vw;
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
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.$bgImg});
  background-size: cover;
  background-position: center center;
  border-radius: 6px;
  cursor: pointer;
  &:first-child {
    transform-origin: left;
  }
  &:last-child {
    transform-origin: right;
  }
`;

/* Variants */
const rowVariants = (width: number) => ({
  // 130 = btnWidth(60) * 2 + gap(5) * 2
  normal: (isBack: boolean) => ({ x: isBack ? -width + 130 : width - 130 }),
  animate: { x: 0 },
  exit: (isBack: boolean) => ({ x: isBack ? width - 130 : -width + 130 }),
});

const boxVariants = {
  normal: { scale: 1 },
  hover: {
    scale: 1.3,
    y: -50,
    borderTopLeftRadius: "6px",
    borderTopRightRadius: "6px",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    zIndex: 99, // Fix: <InfoBox> hover to top end!
    transition: { delay: 0.4, duration: 0.2, type: "tween" },
  },
};

const sliderButtonVariants = {
  init: { backgroundColor: "rgba(0,0,0,0)" },
  hover: { backgroundColor: "rgba(255,255,255,0.3)" },
};

interface ISliderProps {
  sliderTitle: string;
  mediaType: "movie" | "tv"; // for clicking URL
  data?: IGetMovieResult | IGetRecommendAndTrend | IGetTvTopRated;
  isBanner?: boolean; // T: start [1], F: start [0]
}

export default function Slider({
  sliderTitle,
  mediaType,
  data,
  isBanner = false,
}: ISliderProps) {
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
  const onBoxClick = (itemId: number) =>
    navigate(`/${mediaType}/${itemId}`, { state: { data } });

  // Show data from first, Using 'isBanner' prop.
  const sliderData = isBanner ? data?.results.slice(1) : data?.results;

  return (
    <>
      <Title>{sliderTitle}</Title>
      <SliderWrapper>
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
            {sliderData
              ?.slice(offset * index, offset * index + offset)
              .map((movie) => (
                <Box
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
      </SliderWrapper>
    </>
  );
}
