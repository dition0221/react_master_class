import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
// API
import { ISearch, ISearchMultiResult, searchMulti } from "../api";
import SearchItem from "../components/SearchItem";
import Loader from "../components/Loader";

const Wrapper = styled.main``;

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
      {isLoading && <Loader />}
      {data?.results.map((item) =>
        // if search person, Show related programs
        item.known_for
          ? item.known_for.map((item) => checkDuplicate(item))
          : checkDuplicate(item)
      )}
    </Wrapper>
  );
}
