import React, { PropsWithChildren } from "react";
import styled from "styled-components";

interface Props {
  children: string;
}

const SignInput = ({ children }: Props) => {
  const SignInput_ = styled.input.attrs({ placeholder: children })`
    color: #363e50;
    background-color: #afefffc7;
    padding: 0.6em 0.2em;
    border: 1em solid $bgColor;
    border-radius: 1.2em;
    outline-style: none; /* 포커스시 발생하는 효과 제거를 원한다면 */
    text-align: center;
    font-size: 0.6em;
    border-top: 0.2em;
    border-bottom: 0.2em;
    &::placeholder {
      color: #363e5069;
      text-align: center;
    }
    &:focus {
      caret-color: #363e509d;
      background-color: rgba(194, 243, 255, 0.952);
    }
  `;
  return <SignInput_ />;
};

export default SignInput;
