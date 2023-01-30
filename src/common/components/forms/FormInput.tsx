import { DefaultTFuncReturn } from "i18next";
import React from "react";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import styled, { css } from "styled-components";
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

/* Interfaces */
export interface IFormInputValues {
  /* Sign */
  id: string;
  password: string;
  check: string;

  /* Register */
  nickname: string;
  value: number;
}

/* Props */
type InputProps = {
  label?: any;
  type?: string;
  placeholder?: any;
  focusString?: any;
  value?: string;
};

const FormInput = React.forwardRef<
  HTMLInputElement,
  InputProps & ReturnType<UseFormRegister<IFormInputValues>>
>(
  (
    {
      label,
      type,
      placeholder = "",
      focusString = "",
      name,
      minLength,
      maxLength,
      min,
      max,
      onChange,
    },
    ref
  ) => (
    <FormDiv>
      {label && <label>{label}</label>}
      <input
        name={name}
        type={type ? type : "text"}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={(e) => {
          e.currentTarget.placeholder = focusString;
        }}
        style={
          type === "number" ? { fontSize: "0.7em", fontWeight: "bold" } : {}
        }
        minLength={minLength}
        maxLength={maxLength}
        min={min}
        max={max}
        onBlur={(e) => {
          if (placeholder) e.currentTarget.placeholder = placeholder;
        }}
        ref={ref}
      />
    </FormDiv>
  )
);

export default FormInput;
