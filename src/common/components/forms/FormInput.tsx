import React from "react";
import { Path, UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import { ThemeColor } from "../../styles/theme.style";

const FormDiv = styled.div`
  label {
    font-size: 0.55em;
    font-weight: bold;
    color: rgb(191, 225, 235);
    margin-top: 1.5em;
    margin-bottom: 0.2em;
    display: block;
  }
  input {
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
  }
`;

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

  [x: string]: any;
}
// !! Found using s-c as Input wrapper is best way !!
const FormInput = ({ children, focusString, ...props }: Props) => {
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

interface IFormValues {
  id: string;
  password: string;
  check: string;
}
type InputProps = {
  label: string;
  placeholder: string;
  focusString: string;
};
export const FormInputRHF = React.forwardRef<
  HTMLInputElement,
  InputProps & ReturnType<UseFormRegister<IFormValues>>
>(({ onChange, label, placeholder, focusString }, ref) => (
  <FormDiv>
    <label>{label}</label>
    <input
      ref={ref}
      placeholder={placeholder}
      onChange={onChange}
      onFocus={(e) => {
        e.currentTarget.placeholder = focusString;
      }}
      onBlur={(e) => {
        e.currentTarget.placeholder = placeholder;
      }}
    />
  </FormDiv>
));

export default FormInput;
