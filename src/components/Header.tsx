import styled from "styled-components";

const Nav = styled.nav`
  width: 100%;
  height: 80px;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: red;
  font-size: 12px;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.svg`
  margin-right: 45px;
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
`;

export default function Header() {
  return (
    <Nav>
      <Col>
        <Logo />
        <Items>
          <Item>홈</Item>
          <Item>TV쇼</Item>
        </Items>
      </Col>
      <Col>
        <button>search</button>
      </Col>
    </Nav>
  );
}
