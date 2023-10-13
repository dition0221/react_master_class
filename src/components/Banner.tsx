import styled from "styled-components";
import { makeImagePath } from "../utils"; // Utility
// APIs
import { IGetMovieResult, IGetTvTopRated } from "../api";
// Components
import PlayInfoBtns from "./PlayInfoBtns";

const Wrapper = styled.div<{ $bgImg: string }>`
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-left: 60px;
  padding-bottom: 120px;
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
  margin-bottom: 30px;
`;

interface IBannerProps {
  data?: IGetMovieResult | IGetTvTopRated;
  mediaType: "movie" | "tv";
}

export default function Banner({ data, mediaType }: IBannerProps) {
  // 데이터가 없을 경우 렌더링하지 않음
  if (!data || !data.results || !data.results[0]) return null;

  // Variables
  const title =
    "title" in data?.results[0] ? data.results[0].title : data?.results[0].name;

  return (
    <Wrapper
      $bgImg={makeImagePath(
        data?.results[0].backdrop_path || data?.results[0].poster_path || ""
      )}
    >
      <Title>{title}</Title>
      <Overview>{data?.results[0].overview}</Overview>
      <PlayInfoBtns
        isBanner
        mediaType={mediaType}
        itemId={data.results[0].id}
      />
    </Wrapper>
  );
}
