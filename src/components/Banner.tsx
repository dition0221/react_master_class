import styled from "styled-components";
import { makeImagePath } from "../utils";
import { IGetMovieResult, IGetTvShows } from "../api";

const Wrapper = styled.div<{ $bgImg: string }>`
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

interface IBannerProps {
  data?: IGetMovieResult | IGetTvShows;
}

export default function Banner({ data }: IBannerProps) {
  // 데이터가 없을 경우 렌더링하지 않음
  if (!data || !data.results || !data.results[0]) return null;

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
    </Wrapper>
  );
}
