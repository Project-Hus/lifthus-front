import React, { InputHTMLAttributes, PropsWithChildren } from "react";
import { Path, UseFormRegister } from "react-hook-form";
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
  transition: 0.5s;

  &::placeholder {
    color: #363e5069;
    text-align: center;
  }
  &:focus {
    caret-color: #363e509d;
    background-color: rgba(183, 241, 255, 0.952);
    border: 0.5em solid ${ThemeColor.linkColor};
    border-radius: 0.5em;
    border-top: 0.2em;
    border-bottom: 0.2em;
    transition: 0.5s;
  }
`;

interface Props {
  children: string;
  focusString: string;
  password?: boolean;

  register?: any;

  [x: string]: any;
}

const FormInput = ({
  children,
  focusString,

  register,
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
      {...register}
      {...props}
    />
  );
};

export default FormInput;
