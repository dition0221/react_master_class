import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { IGetVideo, getVideo } from "../api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Buttons = styled.div<{ $isBanner: boolean | undefined }>`
  display: flex;
  align-items: center;
  position: ${(props) => (props.$isBanner ? "static" : "absolute")};
  left: ${(props) => (props.$isBanner ? "auto" : "50px")};
  bottom: ${(props) => (props.$isBanner ? "auto" : "60px")};
  button {
    height: ${(props) => (props.$isBanner ? "48px" : "42px")};
  }
  svg {
    margin-right: 12px;
    margin-top: 2px; // 미세한 조절
  }
`;

const PlayBtn = styled.button`
  /* height: 48px; */
  padding: 10px 25px;
  font-size: 20px;
  font-weight: 500;
  border-radius: 6px;
  border: none;
  display: flex;
  align-items: center;
  color: black;
  background-color: white;
  margin-right: 15px;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
  &:focus,
  &:active {
    outline: 2px solid white;
    outline-offset: 2px;
  }
`;

const InfoBtn = styled(PlayBtn)`
  margin: 0;
  color: ${(props) => props.theme.white.darker};
  background-color: rgba(109, 109, 110, 0.7);
  svg {
    fill: white;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const Overlay = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Iframe = styled(motion.iframe)`
  width: 80%;
  position: fixed;
  aspect-ratio: 16/9;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
`;

interface IPlayInfoBtnsProps {
  itemId: number;
  mediaType: "movie" | "tv";
  isBanner?: boolean; // Banner or Not
}

export default function PlayInfoBtns({
  itemId,
  mediaType,
  isBanner,
}: IPlayInfoBtnsProps) {
  // API - video
  const { isLoading, data } = useQuery<IGetVideo>(
    [mediaType, itemId, "video"],
    () => getVideo(itemId, mediaType)
  );
  const isYoutube =
    data &&
    data?.success === undefined &&
    data?.results.filter((item) => item.site === "YouTube").length > 0;
  const youtubeKey = data?.results.filter((item) => item.site === "YouTube")[0]
    ?.key;

  // Play: Show YouTube video
  const [showing, setShowing] = useState(false);
  const onPlayClick = () => setShowing(true);
  const onOverlayClick = () => setShowing(false);

  // Info: Navigate info-box from banner
  const navigate = useNavigate();
  const onInfoClick = () => {
    mediaType === "movie" ? navigate(`movie/${itemId}`) : navigate(`${itemId}`);
  };

  return (
    <Buttons $isBanner={isBanner}>
      {!isLoading && isYoutube ? (
        <PlayBtn onClick={onPlayClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 384 512"
          >
            <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
          </svg>
          <span>재생</span>
        </PlayBtn>
      ) : null}

      {isBanner ? (
        <InfoBtn onClick={onInfoClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
          >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
          </svg>
          <span>상세 정보</span>
        </InfoBtn>
      ) : null}

      {showing ? (
        <AnimatePresence>
          <Overlay onClick={onOverlayClick} />
          <Iframe
            key={youtubeKey}
            src={`https://www.youtube.com/embed/${youtubeKey}?rel=0&vq=hd1080&autoplay=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></Iframe>
        </AnimatePresence>
      ) : null}
    </Buttons>
  );
}
