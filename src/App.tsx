import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  hover: { rotateZ: 90 },
  click: { borderRadius: "50%" },
};

function App() {
  return (
    <Wrapper>
      <Box
        drag
        dragConstraints={{ top: -50, bottom: 50, left: -50, right: 50 }}
        variants={boxVariants}
        whileDrag="drag"
        whileHover="hover"
        whileTap="click"
      ></Box>
    </Wrapper>
  );
}

export default App;
