import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
  font-size: 128px;
  + span {
    margin-top: 10px;
    color: yellowgreen;
  }
`;

function App() {
  return (
    <Wrapper>
      <Title>Hello</Title>
      <span>@dition0221</span>
    </Wrapper>
  );
}

export default App;
