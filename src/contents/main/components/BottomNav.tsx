import React, { useState } from "react";
import styled from "styled-components";
import { ThemeColor } from "../../../common/styles/theme.style";

const BottomNav = () => {
  const [activeNav, setActiveNav] = useState(2);
  return (
    <NavBar>
      <NavLink onClick={() => setActiveNav(0)} style={{ borderLeft: "none" }}>
        <div>👨‍👩‍👧‍👦</div>
      </NavLink>
      <NavLink onClick={() => setActiveNav(1)}>
        <div>💪</div>
      </NavLink>
      <NavLink onClick={() => setActiveNav(2)}>
        <div>🏠</div>
      </NavLink>
      <NavLink onClick={() => setActiveNav(3)}>
        <div>📊</div>
      </NavLink>
      <NavLink onClick={() => setActiveNav(4)}>
        <div>🙂</div>
      </NavLink>
    </NavBar>
  );
};

export default BottomNav;

const NavBar = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 10vh;
`;

const NavLink = styled.div`
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
  &:hover {
    background-color: ${ThemeColor.basicColorHover};
  }
`;
