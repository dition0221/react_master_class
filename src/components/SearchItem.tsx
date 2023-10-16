import styled from "styled-components";
import { motion } from "framer-motion";
// Interface
import { ISearch } from "../api";
// Utilities
import { makeImagePath } from "../utils";
// Components
import InfoBox from "./InfoBox";
import { useState } from "react";
import ClickedItemComp from "./ClickedItemComp";

const Wrapper = styled(motion.li)``;

const Img = styled(motion.img)`
  width: 100%;
  height: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
  cursor: pointer;
`;

const AlterImg = styled(Img).attrs({ as: motion.div })`
  background-color: ${(props) => props.theme.black.lighter};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 1.2vw;
`;

/* Variants */
const wrapperVariants = {
  hover: {
    scale: 1.3,
    y: -70,
    transition: { delay: 0.4, duration: 0.2, type: "tween" },
  },
};

const imgVariants = {
  init: {
    borderRadius: "6px",
  },
  hover: {
    borderTopLeftRadius: "6px",
    borderTopRightRadius: "6px",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: { delay: 0.4, duration: 0.2, type: "tween" },
  },
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
`;

interface SearchItemProps {
  item: ISearch;
}

/* Component */
export default function SearchItem({ item }: SearchItemProps) {
  // Click item to show detail
  const [isDetail, setIsDetail] = useState(false);
  const onItemClick = () => setIsDetail(true);
  const onOverlayClick = () => setIsDetail(false);

  return (
    <>
      <Wrapper
        variants={wrapperVariants}
        initial="init"
        whileHover="hover"
        transition={{ duration: 0.2, type: "tween" }}
        onClick={onItemClick}
      >
        {item.poster_path || item.backdrop_path ? (
          <Img
            src={makeImagePath(item.poster_path || item.backdrop_path, "w300")}
            alt={item.title || item.name}
            variants={imgVariants}
          />
        ) : (
          <AlterImg variants={imgVariants}>{item.title || item.name}</AlterImg>
        )}
        <InfoBox item={item} />
      </Wrapper>

      {isDetail ? (
        <>
          <Overlay onClick={onOverlayClick} />
          <ClickedItemComp mediaType={item.media_type} searchId={item.id} />
        </>
      ) : null}
    </>
  );
}
