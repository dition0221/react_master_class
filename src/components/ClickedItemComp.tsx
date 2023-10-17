import { AnimatePresence, motion } from "framer-motion";
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
  IGetRecommendAndTrend,
  IGetMovieResult,
  IItemDetail,
  IItemCredit,
  getItemDetail,
  getItemCredit,
  getItemRecommendation,
} from "../api";
// Components
import PlayInfoBtns from "./PlayInfoBtns";

const Item = styled(motion.article)`
  width: 60vw;
  max-width: 934px;
  position: fixed;
  top: 30px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.darker};
  color: ${(props) => props.theme.white.lighter};
  z-index: 4;
  overflow-x: hidden;
`;

const ImgContainer = styled.div`
  position: relative;
`;

const Img = styled.img`
  width: 100%;
  background-size: cover;
  aspect-ratio: 25/14;
  display: block;
`;

const InfoBox = styled.div`
  padding: 30px 48px 0;
`;

const Description = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  margin-bottom: 55px;
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
  &:not(:last-child) {
    margin-bottom: 16px;
  }
  span:first-child {
    color: #777;
    margin-right: 5px;
  }
`;

// Recommend Items
const RecommendContainer = styled.section`
  width: 100%;
  padding-bottom: 50px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
  color: #d2d2d2;
`;

const RecommendItem = styled.article`
  width: 100%;
  height: 380px;
  padding-bottom: 14px;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 6px;
  cursor: pointer;
`;

const RecommendImg = styled(Img)`
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`;

const AlterImg = styled.div`
  width: 100%;
  aspect-ratio: 25/14;
  background-color: ${(props) => props.theme.black.veryDark};
  font-size: 1vw;
  font-weight: 600;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RecommendTitle = styled(Title)`
  font-size: 18px;
  margin-top: 15px;
  margin-bottom: 0;
`;

const RecommendYear = styled(Title)`
  font-size: 12px;
  margin-bottom: 20px;
`;

const RecommendOverview = styled(Overview)`
  font-size: 14px;
  line-height: 20px;
  padding: 0 14px;
`;

const Error404 = styled.div`
  color: ${(props) => props.theme.red};
  font-size: calc(max(2vw, 20px));
  font-weight: 900;
  text-align: center;
  overflow: hidden;
`;

/* Variants */
const itemVariants = {
  init: { scale: 0.8, opacity: 0 },
  yesResult: {
    borderRadius: "6px",
    scale: 1,
    opacity: 1,
    height: "calc(100% - 30px)", // 100% - top
  },
  noResult: { borderRadius: "6px", scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
};

interface IUseLocationProps {
  state: { data: IGetMovieResult | null };
}

interface IClickedItemProps {
  mediaType: "movie" | "tv";
  searchId?: number; // Item's id from <SearchItem>
}

export default function ClickedItemComp({
  mediaType,
  searchId,
}: IClickedItemProps) {
  const navigate = useNavigate();

  // Data: from URL params
  const params = useParams();
  const paramsItemId = params.id ?? "0";

  // Data: from <slider>'s <box>
  const bigItemMatch = useMatch(`/${mediaType}/:id`);
  const itemIdParam = bigItemMatch?.params.id;
  const location = useLocation() as IUseLocationProps;
  const data = location?.state?.data ?? { results: [] };
  const clickedItem = itemIdParam
    ? data?.results.find((item) => item.id === +itemIdParam)
    : undefined; // Movie's data from home

  // Final movie id
  const itemId = (clickedItem ? clickedItem.id : +paramsItemId) || searchId!;

  // API
  // TODO :  tv episode 섹션 추가 (recommend 앞에)
  // ㄴ https://developer.themoviedb.org/reference/tv-season-details
  // TODO : 'useQueries()'로 코드를 합쳐보자
  const { data: detailData } = useQuery<IItemDetail>(
    [mediaType, "detail", itemId],
    () => getItemDetail(mediaType, itemId)
  );
  const { data: creditData } = useQuery<IItemCredit>(
    [mediaType, "credit", itemId],
    () => getItemCredit(mediaType, itemId)
  );
  const { data: recommendationData } = useQuery<IGetRecommendAndTrend>(
    [mediaType, "recommendation", itemId],
    () => getItemRecommendation(mediaType, itemId)
  );

  // Variables
  const overview = (clickedItem || detailData)?.overview
    ? ((clickedItem || detailData)?.overview || "").length > 150
      ? (clickedItem || detailData)?.overview.slice(0, 150) + "..."
      : (clickedItem || detailData)?.overview
    : "- Overview unknown -";

  return (
    <AnimatePresence>
      <Item
        variants={itemVariants}
        initial="init"
        animate={
          recommendationData?.results !== undefined &&
          recommendationData?.results.length > 0
            ? "yesResult"
            : "noResult"
        }
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {detailData?.success === undefined ||
        creditData?.success === undefined ? (
          <>
            {(clickedItem || detailData)?.backdrop_path ? (
              <ImgContainer>
                <Img
                  src={makeImagePath(
                    (clickedItem || detailData)?.backdrop_path ||
                      (clickedItem || detailData)?.poster_path ||
                      ""
                  )}
                  alt="썸네일"
                />
                <PlayInfoBtns itemId={itemId} mediaType={mediaType} />
              </ImgContainer>
            ) : null}
            <InfoBox>
              <Title>
                {(clickedItem || detailData)?.title ||
                  (clickedItem || detailData)?.name}
              </Title>
              <Description>
                <div>
                  <Overview>{overview}</Overview>
                </div>
                <div>
                  <Detail>
                    <span>출연:</span>
                    <span>
                      {creditData?.cast
                        ?.slice(0, 3)
                        ?.map((g) => g.name)
                        .join(", ") || "- Cast unknown -"}
                    </span>
                  </Detail>
                  <Detail>
                    <span>장르:</span>
                    <span>
                      {detailData?.genres?.map((g) => g.name).join(", ") ||
                        "- Genre unknown -"}
                    </span>
                  </Detail>
                  <Detail>
                    <span>개봉일:</span>
                    <span>
                      {(clickedItem || detailData)?.release_date ||
                        (clickedItem || detailData)?.first_air_date}
                    </span>
                  </Detail>
                </div>
              </Description>

              {recommendationData?.results.length ? (
                <>
                  <Title style={{ textAlign: "left" }}>
                    함께 시청된 콘텐츠
                  </Title>
                  <RecommendContainer>
                    {recommendationData.results.map((item) => (
                      <RecommendItem
                        onClick={() => navigate(`/${mediaType}/${item.id}`)}
                        key={item.id}
                      >
                        {item.backdrop_path ? (
                          <RecommendImg
                            src={makeImagePath(item.backdrop_path, "w500")}
                            alt={item.title || item.name || "썸네일"}
                          />
                        ) : (
                          <AlterImg>{item.title || item.name}</AlterImg>
                        )}
                        <RecommendTitle>
                          {item.title || item.name}
                        </RecommendTitle>
                        <RecommendYear>
                          {(item.release_date || item.first_air_date) ??
                            "- Date unknown -"}
                        </RecommendYear>
                        <RecommendOverview>
                          {item.overview
                            ? item.overview.length > 135
                              ? item.overview.slice(0, 135) + "..."
                              : item.overview
                            : "- Overview unknown -"}
                        </RecommendOverview>
                      </RecommendItem>
                    ))}
                  </RecommendContainer>
                </>
              ) : null}
            </InfoBox>
          </>
        ) : (
          <Error404>
            Error : 404 <br />
            페이지를 찾을 수 없습니다.
          </Error404>
        )}
      </Item>
    </AnimatePresence>
  );
}
