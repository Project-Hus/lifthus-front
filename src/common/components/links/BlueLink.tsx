import React, { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { ThemeColor } from "../../styles/theme.style";

const LinkStyled = styled.a`
  position: relative;

  cursor: pointer;

  font-size: 1.4rem;

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

  return (
    <LinkStyled
      {...(to
        ? {
            onClick: (e) => {
              navigate(to);
            },
          }
        : onClick
        ? { onClick: onClick }
        : {})}
    >
      {children}
    </LinkStyled>
  );
};

export default BlueLink;
