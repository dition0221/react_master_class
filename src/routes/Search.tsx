import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
// API
import { ISearchMultiResult, searchMulti } from "../api";

export default function Search() {
  // Search movies from API
  const keyword = useSearchParams()[0].get("keyword") || "";
  const { isLoading, data } = useQuery<ISearchMultiResult>(
    ["search", keyword],
    () => searchMulti(keyword)
  );

  return (
    <div>
      {data?.results.map((v) =>
        v.known_for ? (
          v.known_for.map((vv) => <h2>{vv.title || vv.name}</h2>)
        ) : (
          <h2>{v.name || v.title}</h2>
        )
      )}
    </div>
  );
  // TODO: API interface 정의하기
  //* "known_for"이 존재할 경우 보여줘야 함
  //? 또는 영화, 사람, TV 등 따로 검색
  //! 좋지 않음, API를 여러 번 사용해야 함 (해결)

  //* '.map()'을 사용해 하나의 API 사용으로 여러 개의 리스트를 보여줌을 완성함
  //* = 인물 연관 검색이 가능해짐

  // TODO: 중복 검사 필요 (ex. '백종원' 검색 시 '백종원의 골목식당'이 2번 나옴)
  //* 제목검색과 인물검색으로 인해 각각 결과가 나오는 것으로 추정함
}
