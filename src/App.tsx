import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
`;
const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.btnColor};
`;

function App() {
  return (
    <Container>
      <H1>Hello</H1>
      <Button>Button</Button>
    </Container>
  );
}

export default App;
