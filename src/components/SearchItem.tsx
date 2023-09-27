import styled from "styled-components";
// Interface
import { ISearch } from "../api";
// Utilities
import { makeImagePath } from "../utils";

interface SearchItemProps {
  item: ISearch;
}

const Wrapper = styled.article``;

const Img = styled.div<{ $bgImg: string }>`
  width: 200px;
  height: 300px;
  background-image: url(${(props) => props.$bgImg});
`;

export default function SearchItem({ item }: SearchItemProps) {
  return (
    <Wrapper>
      <Img
        $bgImg={makeImagePath(item.poster_path || item.backdrop_path, "w200")}
      />
      <h2>{item.name || item.title}</h2>
      <p>{item.overview}</p>
      <br />
    </Wrapper>
  );
}
