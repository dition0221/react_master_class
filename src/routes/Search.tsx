import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
// API
import { ISearch, ISearchMultiResult, searchMulti } from "../api";
import SearchItem from "../components/SearchItem";
import Loader from "../components/Loader";

const Wrapper = styled.main`
  padding-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const SearchForOnTop = styled.h1`
  font-size: calc(max(22px, min(2.2vw, 48px))); // 22px ~ 2.2vw ~ 48px
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  z-index: -1;
`;

const List = styled.ul`
  position: relative;
  max-width: 1920px;
  padding: 100px;
  padding-bottom: 200px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 65px;
  li:nth-child(6n + 1) {
    transform-origin: left;
  }
  li:nth-child(6n) {
    transform-origin: right;
  }
`;

/* Component */
export default function Search() {
  // Search programs from API
  const keyword = useSearchParams()[0].get("keyword") || "";
  const { isLoading, data } = useQuery<ISearchMultiResult>(
    ["search", keyword],
    () => searchMulti(keyword)
  );

  // Check duplication programs
  const uniqueKeys = new Set();
  const checkDuplicate = (item: ISearch) => {
    if (!uniqueKeys.has(item.id)) {
      uniqueKeys.add(item.id);
      return <SearchItem item={item} key={item.id} />;
    }
    return null;
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <List>
            {data?.results.map((item) =>
              // if search person, Show related programs
              item.known_for
                ? item.known_for.map((item) => checkDuplicate(item))
                : checkDuplicate(item)
            )}
          </List>
          <SearchForOnTop>
            "{keyword}" 검색 결과 ({uniqueKeys.size})
          </SearchForOnTop>
        </>
      )}
    </Wrapper>
  );
}
