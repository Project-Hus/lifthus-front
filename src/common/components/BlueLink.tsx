import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const LinkStyled = styled.a`
  position: relative;

  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-decoration: none;
  color: #6b71c8;
  &:hover {
    color: #9297d6;
  }
`;

interface Props {
  href: string;
}

const BlueLink = ({ href, children }: PropsWithChildren<Props>) => {
  return <LinkStyled href={href}>{children}</LinkStyled>;
};

export default BlueLink;
