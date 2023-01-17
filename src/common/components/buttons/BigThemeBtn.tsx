import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { ThemeColor } from "../../styles/theme.style";

const ThemeBtn = styled.button`
  position: relative;

  height: 3rem;
  width: 10rem;
  font-size: 1rem;
  background-color: ${ThemeColor.basicColor};
  color: #000766;
  font-weight: bold;
  border: none;
  border-radius: 0.4rem 0.4rem 0.4rem 0.4rem;
  transition: 0.2s;

  box-shadow: 0 0 0.5rem 0.3rem;

  &:hover {
    background-color: ${ThemeColor.basicColorHover};
    box-shadow: 0 0 0.5rem 0.5rem #3d44a7;
  }
`;

type BigThemeBtnInput = {
  content: string;
  to?: string;
};
const BigThemeBtn = ({ content, to }: BigThemeBtnInput) => {
  return to ? (
    <Link to={to}>
      <ThemeBtn>{content}</ThemeBtn>;
    </Link>
  ) : (
    <ThemeBtn>{content}</ThemeBtn>
  );
};

export default BigThemeBtn;
