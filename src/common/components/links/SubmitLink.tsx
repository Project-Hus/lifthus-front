import React, { FormEventHandler, MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { ThemeColor } from "../../styles/theme.style";
import { SubmitHandler } from "react-hook-form";

const SubmitStyled = styled.button`
  position: relative;

  cursor: pointer;

  font-size: 1.4rem;

  margin-bottom: 1rem;
  text-decoration: none;
  color: ${ThemeColor.linkColor};
  &:hover {
    color: ${ThemeColor.linkColorHover};
  }
`;

interface Props {
  children: string;
  onSubmit: FormEventHandler<HTMLButtonElement>;
}

const SubmitLink = ({ children, onSubmit }: Props) => {
  return (
    <SubmitStyled type="submit" onSubmit={onSubmit}>
      {children}
    </SubmitStyled>
  );
};

export default SubmitLink;
