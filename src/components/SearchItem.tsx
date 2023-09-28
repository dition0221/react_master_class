import styled from "styled-components";
import { motion } from "framer-motion";
// Interface
import { ISearch } from "../api";
// Utilities
import { makeImagePath } from "../utils";

interface SearchItemProps {
  item: ISearch;
}

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
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 1.2vw;
`;

const InfoBox = styled(motion.article)`
  width: 100%;
  height: 100px;
  opacity: 0;
  background-color: ${(props) => props.theme.black.darker};
  position: absolute;
  top: 100%;
`;

/* Variants */
const wrapperVariants = {
  hover: {
    scale: 1.3,
    y: -50,
    transition: { delay: 0.4, duration: 0.2, type: "tween" },
  },
};

const infoBoxVariants = {
  init: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: { delay: 0.4, duration: 0.2, type: "tween" },
  },
};

/* Component */
export default function SearchItem({ item }: SearchItemProps) {
  return (
    <Wrapper
      variants={wrapperVariants}
      whileHover="hover"
      transition={{ duration: 0.2, type: "tween" }}
    >
      {item.poster_path || item.backdrop_path ? (
        <Img
          src={makeImagePath(item.poster_path || item.backdrop_path, "w300")}
          alt={item.title || item.name}
        />
      ) : (
        <AlterImg>{item.title || item.name}</AlterImg>
      )}
      <InfoBox variants={infoBoxVariants}>
        <span>{item.title || item.name}</span>
      </InfoBox>
    </Wrapper>
  );
}
