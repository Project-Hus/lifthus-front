import React from "react";
import { useNavigate } from "react-router-dom";

import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";

import logo from "../../logo.svg";

type LogoType = {
  to?: string;
  mov?: boolean;
  big?: boolean;
  absolute?: boolean;
};

const Logo = ({
  to = "/",
  mov = false,
  big = false,
  absolute = false,
}: LogoType) => {
  let navigate = useNavigate();
  return (
    <LogoStyled
      src={logo}
      alt="lifthus logo"
      onClick={() => {
        navigate(to);
      }}
      mov={mov}
      big={big}
      absolute={absolute}
    />
  );
};

export default Logo;

const lifting = keyframes`
    0% {width:50vmax;}
    20% {width:46vmax;}
    25% {width:45vmax;}
    50% {width:50vmax;}
    100% {width:50vmax;}
`;
const LogoStyled = styled.img<{
  mov: boolean;
  big: boolean;
  absolute: boolean;
}>`
  position: ${(props) => (props.absolute ? css`absolute` : css`relative`)};
  top: ${(props) => (props.absolute ? css`20vh` : "")};
  max-width: 100vw;
  cursor: pointer;

  ${(props) =>
    props.big == false &&
    css`
      width: 30vmax;
    `}

  ${(props) =>
    props.mov &&
    css`
      animation: ${lifting} 4s infinite;
    `}
`;
