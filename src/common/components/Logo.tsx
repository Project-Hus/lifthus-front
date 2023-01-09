import React from "react";
import { useNavigate } from "react-router-dom";

import styled, { css, keyframes } from "styled-components";

import logo from "../../logo.svg";

const lifting = keyframes`
    0% {width:50vmax;}
    20% {width:46vmax;}
    25% {width:45vmax;}
    50% {width:50vmax;}
    100% {width:50vmax;}
`;
const LogoStyled = styled.img<{ mov: boolean }>`
  position: absolute;
  top: 20vh;
  max-width: 100vw;
  cursor: pointer;

  ${(props) =>
    props.mov &&
    css`
      animation: ${lifting} 4s infinite;
    `}
`;

type LogoType = {
  to?: string;
  mov?: boolean;
};
/* if this Logo covers another component, should be set the component css position relative*/
const Logo = ({ to = "/", mov = false }: LogoType) => {
  let navigate = useNavigate();
  return (
    <LogoStyled
      src={logo}
      alt="lifthus logo"
      onClick={() => {
        navigate(to);
      }}
      mov={mov}
    />
  );
};

export default Logo;
