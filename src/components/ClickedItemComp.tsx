import { AnimatePresence, motion } from "framer-motion";
import {
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { UseQueryResult, useQueries, useQuery } from "@tanstack/react-query";
import { useState, memo } from "react";
import { Helmet } from "react-helmet-async";
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
  IGetTvEpisode,
  getTvEpisode,
} from "../api";
// Components
import PlayInfoBtns from "./PlayInfoBtns";

const Item = styled(motion.article)`
  width: 60vw;
  max-width: 934px; // TODO mobile - width: 95vw
  position: fixed;
  top: 30px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.darker};
  color: ${(props) => props.theme.white.lighter};
  z-index: 4;
  overflow-x: hidden;
  /* Don't show scroll-bar  */
  overflow-y: auto;
  &::-webkit-scrollbar {
    // Chrome, Safari
    display: none;
  }
  scrollbar-width: none; // Firefox
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
  margin-bottom: 50px;
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

// Season & Episode
const SeasonTitleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 17px;
  align-items: center;
`;

const SelectSeasonBtn = styled.button`
  width: max-content;
  max-width: 100%;
  min-height: 40px;
  padding: 9px;
  color: white;
  font-size: min(max(14px, 0.9vw), 18px); // 14px ~ 0.9vw ~ 18px
  text-align: left;
  background-color: #242424;
  border: 1px solid #424242;
  border-radius: 6px;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    fill: white;
    margin-left: 10px;
  }
`;

const SeasonList = styled.ul`
  min-width: max-content;
  border: 1px solid #424242;
  margin-top: 3px;
  background-color: #242424;
  position: absolute;
  right: 0;
  top: 100%;
  font-weight: 500;
  font-size: min(max(12px, 0.8vw), 16px); // 12px ~ 0.8vw ~ 16px
  li {
    padding: 9px 14px;
    &:hover {
      background-color: #333;
    }
  }
`;

const SubTitle = styled.h4`
  margin-bottom: 10px;
  font-size: 14px;
`;

const EpisodeContainer = styled.ul`
  width: 100%;
  margin-bottom: 50px;
`;

const Episode = styled.li`
  padding: 16px;
  border-bottom: 1px solid #424242;
  border-radius: 6px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #2f2f2f;
  }
  h1 {
    width: 3vw;
    display: block;
    text-align: center;
    font-size: 24px;
    color: #d2d2d2;
  }
`;

const EpisodeImg = styled(Img)`
  max-width: 150px;
  aspect-ratio: 25/14;
  margin-left: 7px;
  margin-right: 14px;
`;

const EpisodeAlterImg = styled(EpisodeImg).attrs({ as: "div" })`
  background-color: ${(props) => props.theme.black.darker};
  border: 1px solid ${(props) => props.theme.white.darker};
  color: ${(props) => props.theme.white.darker};
  font-size: 1vw;
  font-weight: 600;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EpisodeDescription = styled.div`
  width: 100%;
  small {
    font-size: 12px;
    color: #d2d2d2;
  }
`;

const EpisodeTitle = styled.div`
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
`;

const EpisodeOverview = styled.p`
  font-size: 14px;
  color: #d2d2d2;
  margin-bottom: 5px;
`;

const EpisodeMoreBtn = styled.div`
  height: 2px;
  background-color: #424242;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    width: 42px;
    height: 42px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #8d8d8d;
    border-radius: 50%;
    background-color: rgba(42, 42, 42, 0.6);
    cursor: pointer;
    &:hover {
      border-color: white;
      background-color: rgba(255, 255, 255, 0.1);
    }
    svg {
      width: 75%;
      height: 75%;
      fill: ${(props) => props.theme.white.darker};
    }
  }
`;

// Recommend Items
const RecommendContainer = styled.section`
  width: 100%;
  margin-bottom: 50px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
  color: #d2d2d2;
`;

const RecommendItem = styled.article`
  width: 100%;
  max-height: fit-content;
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
  result: {
    borderRadius: "6px",
    scale: 1,
    opacity: 1,
    maxHeight: "calc(100% - 30px)", // 100% - top
  },
  exit: { scale: 0.8, opacity: 0 },
};

interface IUseLocationProps {
  state: { data: IGetMovieResult | null };
}

interface IClickedItemProps {
  mediaType: "movie" | "tv";
  searchId?: number; // Item's id from <SearchItem>
}

function ClickedItemComp({ mediaType, searchId }: IClickedItemProps) {
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

  // Final item id
  const itemId = (clickedItem ? clickedItem.id : +paramsItemId) || searchId!;

  // APIs
  const { data: detailData } = useQuery<IItemDetail>(
    [mediaType, itemId, "detail"],
    () => getItemDetail(mediaType, itemId)
  );
  const { data: creditData } = useQuery<IItemCredit>(
    [mediaType, itemId, "credit"],
    () => getItemCredit(mediaType, itemId)
  );
  const { data: recommendationData } = useQuery<IGetRecommendAndTrend>(
    [mediaType, itemId, "recommendation"],
    () => getItemRecommendation(mediaType, itemId)
  );

  // API: TV seasons & episode
  const seasonParams = detailData?.seasons?.map((season) => ({
    name: season.name,
    seasonNumber: season.season_number,
  }));
  const seasonData = useQueries({
    queries:
      seasonParams?.map((season) => ({
        queryKey: [
          mediaType,
          itemId,
          "episode",
          `season ${season.seasonNumber}`,
        ],
        queryFn: () => getTvEpisode(itemId, season.seasonNumber),
      })) || [],
  }) as UseQueryResult<IGetTvEpisode>[];
  const seasonLoadDone = seasonData.every((season) => !season.isLoading);
  // * 'seasonData.length' === 0, 정보가 없음

  // TV Season <SelectSeasonBtn> value
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const onSelectClick = () => setIsSelectOpen((prev) => !prev);
  const onLiClick = (index: number) => setSelectedSeasonIndex(index);

  // Show more/less tv episodes by clicking <EpisodeMoreBtn>
  const [isEpisodeOpen, setIsEpisodeOpen] = useState(false);
  const toggleEpisodeOpen = () => {
    if (isEpisodeOpen) {
      const targetEl = document.getElementById("season-episode");
      targetEl?.scrollIntoView({ behavior: "smooth" });
    }
    setIsEpisodeOpen((prev) => !prev);
  };

  // Variables
  const overview = (clickedItem || detailData)?.overview
    ? ((clickedItem || detailData)?.overview || "").length > 150
      ? (clickedItem || detailData)?.overview.slice(0, 150) + "..."
      : (clickedItem || detailData)?.overview
    : "- Overview unknown -";

  return (
    <>
      <Helmet>
        <title>{`${
          (clickedItem || detailData)?.title ||
          (clickedItem || detailData)?.name
        } - 넷플릭스`}</title>
      </Helmet>

      <AnimatePresence>
        <Item
          variants={itemVariants}
          initial="init"
          animate="result"
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
                    alt="Backdrop Thumbnail"
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

                {/* Season & Episode */}
                {seasonLoadDone && seasonData.length !== 0 ? (
                  <>
                    <SeasonTitleHeader id="season-episode">
                      <Title style={{ textAlign: "left", marginBottom: 0 }}>
                        회차
                      </Title>
                      <SelectSeasonBtn onClick={onSelectClick}>
                        {seasonData[selectedSeasonIndex].data?.name}
                        {isSelectOpen ? (
                          <>
                            <motion.svg
                              layoutId="selectSeason"
                              xmlns="http://www.w3.org/2000/svg"
                              height="1em"
                              viewBox="0 0 320 512"
                            >
                              <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
                            </motion.svg>
                            <SeasonList>
                              {seasonData.map((season, index) => (
                                <li
                                  key={`season id: ${season.data?.id || index}`}
                                  onClick={() => onLiClick(index)}
                                >{`${season.data?.name} (${season.data?.episodes.length}개 에피소드)`}</li>
                              ))}
                            </SeasonList>
                          </>
                        ) : (
                          <motion.svg
                            layoutId="selectSeason"
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 320 512"
                          >
                            <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                          </motion.svg>
                        )}
                      </SelectSeasonBtn>
                    </SeasonTitleHeader>
                    <SubTitle>
                      {seasonData[selectedSeasonIndex].data?.name}
                    </SubTitle>
                    <EpisodeContainer>
                      {seasonData[selectedSeasonIndex].data?.episodes
                        .slice(0, isEpisodeOpen ? undefined : 10)
                        .map((episode, index) => (
                          <Episode key={episode.id}>
                            <h1>{index + 1}</h1>
                            {episode.still_path ? (
                              <EpisodeImg
                                src={makeImagePath(
                                  episode.still_path || "",
                                  "w200"
                                )}
                                alt="Episode Thumbnail"
                              />
                            ) : (
                              <EpisodeAlterImg>
                                {episode.name || `에피소드 ${index}`}
                              </EpisodeAlterImg>
                            )}
                            <EpisodeDescription>
                              <EpisodeTitle>
                                <span>
                                  {episode.name || `에피소드 ${index}`}
                                </span>
                                {episode.runtime && (
                                  <span>{`${episode.runtime}분`}</span>
                                )}
                              </EpisodeTitle>
                              <EpisodeOverview>
                                {episode.overview.length > 100
                                  ? episode.overview.slice(0, 100) + "..."
                                  : episode.overview}
                              </EpisodeOverview>
                              {episode.air_date && (
                                <small>{episode.air_date}</small>
                              )}
                            </EpisodeDescription>
                          </Episode>
                        ))}
                      {seasonData[selectedSeasonIndex].data?.episodes.length! >
                      10 ? (
                        <EpisodeMoreBtn>
                          <button onClick={toggleEpisodeOpen}>
                            {isEpisodeOpen ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 512 512"
                              >
                                <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 512 512"
                              >
                                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                              </svg>
                            )}
                          </button>
                        </EpisodeMoreBtn>
                      ) : null}
                    </EpisodeContainer>
                  </>
                ) : null}

                {/* Recommend programs */}
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
    </>
  );
}

export default memo(ClickedItemComp);
