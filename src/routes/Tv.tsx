import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
// APIs
import { IGetTvShows, getTvShowsTopRated } from "../api";
// Components
import Loader from "../components/Loader";
import Banner from "../components/Banner";

/* Styled */
const Wrapper = styled.main`
  background-color: black;
  padding-bottom: 200px;
  overflow: hidden;
`;

export default function Tv() {
  const { isLoading, data } = useQuery<IGetTvShows>(
    ["tvShows", "topRated"],
    getTvShowsTopRated
  );

  console.log(data);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Banner data={data} />
        </>
      )}
    </Wrapper>
  );
}
