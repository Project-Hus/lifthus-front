import React, { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ThemeColor } from "../../styles/theme.style";

const LinkStyled = styled.a`
  position: relative;

  cursor: pointer;

  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-decoration: none;
  color: ${ThemeColor.linkColor};
  &:hover {
    color: ${ThemeColor.linkColorHover};
  }
`;

interface Props {
  children: string;
  to?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  [x: string]: any;
}

const BlueLink = ({ children, to, onClick }: Props) => {
  const navigate = useNavigate();
  if (to)
    return (
      <LinkStyled
        onClick={(e) => {
          navigate(to);
        }}
      >
        {children}
      </LinkStyled>
    );
  else if (onClick)
    return <LinkStyled onClick={onClick}>{children}</LinkStyled>;
  else return <LinkStyled>{children}</LinkStyled>;
};

export default BlueLink;
