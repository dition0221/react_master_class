import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// Components
import ClickedItemComp from "../components/ClickedItemComp";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
  z-index: 3;
`;

interface IClickedItemProps {
  mediaType: "movie" | "tv";
}

export default function ClickedItem({ mediaType }: IClickedItemProps) {
  // Click outside, Exit modal-box
  const navigate = useNavigate();
  const onOverlayClick = () => navigate("..");

  return (
    <>
      <Overlay
        onClick={onOverlayClick}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <ClickedItemComp mediaType={mediaType} />
    </>
  );
}
