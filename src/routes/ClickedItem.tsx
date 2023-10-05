import { motion } from "framer-motion";
import {
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
// Utility
import { makeImagePath } from "../utils";
// API & Interface
import {
  IGetMovieCredits,
  IGetMovieDetails,
  IGetMovieRecommendations,
  IGetMovieResult,
  getMovieCredit,
  getMovieDetail,
  getMovieRecommendation,
} from "./../api";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
  z-index: 3;
`;

const Movie = styled(motion.article)`
  width: 60vw;
  max-width: 850px;
  position: fixed;
  top: 30px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.darker};
  color: ${(props) => props.theme.white.lighter};
  z-index: 4;
  overflow: hidden;
`;

const Img = styled.img`
  background-size: cover;
  width: 100%;
  aspect-ratio: 25/14;
  display: block;
`;

const InfoBox = styled.div`
  padding: 30px 48px;
`;

const Description = styled.div`
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
`;

const Title = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 30px;
`;

const Overview = styled.p`
  font-size: 16px;
  line-height: 26px;
`;

const Detail = styled.p`
  font-size: 14px;
  line-height: 20px;
  span:first-child {
    color: #777;
    margin-right: 5px;
  }
  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

interface IUseLocationProps {
  state: {
    data: IGetMovieResult | null;
  };
}

export default function ClickedItem() {
  // if click outside, Exit modal-box
  const navigate = useNavigate();
  const onOverlayClick = () => navigate("/");

  // Data: from URL params
  const params = useParams();
  const paramsMovieId = params.movieId ?? "0";

  // Data: from home('/')
  const bigMovieMatch = useMatch("/movies/:movieId");
  const movieIdParam = bigMovieMatch?.params.movieId;
  const location = useLocation() as IUseLocationProps;
  const data = location?.state?.data ?? { results: [] };
  const clickedMovie = movieIdParam
    ? data?.results.find((movie) => movie.id === +movieIdParam)
    : undefined; // Movie's data from home

  // Final movie id
  const movieId = clickedMovie ? clickedMovie.id : +paramsMovieId;

  // API
  // TODO : 404 response를 핸들링 해야 함
  // TODO : 'useQueries()'로 코드를 합쳐보자
  const { data: detailData } = useQuery<IGetMovieDetails>(
    ["detail", movieId],
    () => getMovieDetail(+movieId)
  );
  const { data: creditData } = useQuery<IGetMovieCredits>(
    ["credit", movieId],
    () => getMovieCredit(+movieId)
  );
  //   const { data: recommendationData } = useQuery<IGetMovieRecommendations>(
  //     ["recommendation", bigMovieMatch?.params.movieId],
  //     () => getMovieRecommendation(+bigMovieMatch?.params.movieId!)
  //   );

  return (
    <>
      <Overlay
        onClick={onOverlayClick}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <Movie
        layoutId={bigMovieMatch?.params.movieId}
        animate={{ borderRadius: "6px" }}
      >
        {/* 조건 바꿔야함 ('error가 아닐 시'로) */}
        {clickedMovie || detailData || creditData ? (
          <>
            <Img
              src={makeImagePath(
                clickedMovie?.backdrop_path || detailData?.backdrop_path || ""
              )}
              alt="썸네일"
            />
            <InfoBox>
              <Description>
                <div>
                  <Title>{clickedMovie?.title || detailData?.title}</Title>
                  <Overview>
                    {(clickedMovie && clickedMovie?.overview?.length > 150
                      ? clickedMovie?.overview.slice(0, 150) + "..."
                      : clickedMovie?.overview) ||
                      (detailData && detailData?.overview?.length > 150
                        ? detailData?.overview.slice(0, 150) + "..."
                        : detailData?.overview)}
                  </Overview>
                </div>
                <div>
                  <Detail>
                    <span>출연:</span>
                    <span>
                      {creditData?.cast
                        ?.slice(0, 3)
                        ?.map((g) => g.name)
                        .join(", ")}
                    </span>
                  </Detail>
                  <Detail>
                    <span>장르:</span>
                    <span>
                      {detailData?.genres?.map((g) => g.name).join(", ")}
                    </span>
                  </Detail>
                  <Detail>
                    <span>개봉일:</span>
                    <span>
                      {clickedMovie?.release_date || detailData?.release_date}
                    </span>
                  </Detail>
                </div>
              </Description>
            </InfoBox>
          </>
        ) : null}
      </Movie>
    </>
  );
}
