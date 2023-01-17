import React, { InputHTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";
import { ThemeColor } from "../../styles/theme.style";

const FormInput_ = styled.input`
  color: #363e50;
  background-color: #afefffc7;
  padding: 0.6em 0.2em;
  border: 1em solid ${ThemeColor.backgroundColor};
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

interface Props {
  children: string;
  focusString: string;
  password?: boolean;
  [x: string]: any;
}

const FormInput = ({
  children,
  focusString,
  password = false,
  ...props
}: Props) => {
  return (
    <FormInput_
      placeholder={children}
      onFocus={(e) => {
        e.currentTarget.placeholder = focusString;
      }}
      onBlur={(e) => {
        e.currentTarget.placeholder = children;
      }}
      {...props}
    />
  );
};

export default FormInput;
