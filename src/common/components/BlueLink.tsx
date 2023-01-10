import React from "react";
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

type BlueLinkProp = {
  href: string;
  content: string;
};
const BlueLink = ({ href, content }: BlueLinkProp) => {
  return <LinkStyled href={href}>{content}</LinkStyled>;
};

export default BlueLink;
