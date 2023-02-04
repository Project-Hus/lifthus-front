import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { ThemeColor } from "../../../common/styles/theme.style";

const BottomNav = () => {
  const [activeNav, setActiveNav] = useState(2);
  return (
    // borderLeft: "none"
    <NavBar>
      <NavLink to="/group" onClick={() => setActiveNav(0)}>
        <NavItem active={true ? activeNav == 0 : false}>👨‍👩‍👧‍👦!</NavItem>
      </NavLink>
      <NavLink to="/training" onClick={() => setActiveNav(1)}>
        <NavItem active={true ? activeNav == 1 : false}>💪!</NavItem>
      </NavLink>
      <NavLink to="/" onClick={() => setActiveNav(2)}>
        <NavItem active={true ? activeNav == 2 : false}>🏠!</NavItem>
      </NavLink>
      <NavLink to="/statistics" onClick={() => setActiveNav(3)}>
        <NavItem active={true ? activeNav == 3 : false}>📊!</NavItem>
      </NavLink>
      <NavLink to="/profile" onClick={() => setActiveNav(4)}>
        <NavItem active={true ? activeNav == 4 : false}>🙂!</NavItem>
      </NavLink>
    </NavBar>
  );
};

export default BottomNav;

const NavBar = styled.nav`
  /* 네비바 하단 고정 밑 세로 길이 설정 */
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 10vh;
  /* nav태그 아래의 자식들을 수평정렬하기 위한 설정 */
  overflow: hidden;
  background-color: ${ThemeColor.basicColor};
  width: 100%;
`;
/* nav태그 아래의 div태그들을 수평정렬 및 세로길이 설정 */
const NavLink = styled(Link)`
  text-decoration-line: none;
  /* 수평정렬, 5개의 button을 각각 20% width만큼 할당 */
  box-sizing: border-box;
  text-align: center;
  float: left;
  width: 20%;
  border-left: 1px solid grey;
  transition: 0.3s;
  /* 세로길이 설정 */
  height: 10vh;
  line-height: 10vh;
`;

const NavItem = styled.div<{ active?: boolean }>`
  background-color: ${ThemeColor.basicColor};
  transition: 0.3s;

  color: ${ThemeColor.backgroundColor};

  &:hover {
    background-color: ${ThemeColor.basicColorHover};
  }

  ${(props) =>
    (props.active || false) &&
    css`
      color: aliceblue;
    `}
`;
