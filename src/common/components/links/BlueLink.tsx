import React, { PropsWithChildren } from "react";
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
  [x: string]: any;
}

const BlueLink = ({ children, ...props }: Props) => {
  return <LinkStyled {...props}>{children}</LinkStyled>;
};

export default BlueLink;
