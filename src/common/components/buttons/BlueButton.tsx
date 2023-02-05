import React, { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { ThemeColor } from "../../styles/theme.style";

const Bbtn = styled.button`
  margin-top: 1.5em;
  margin-bottom: 1rem;
  text-decoration: none;

  padding: 0em;

  cursor: pointer;

  border: solid 0.2em;
  border-radius: 0.2em;

  background-color: rgba(0, 0, 0, 0);
  color: ${ThemeColor.linkColor};
  font-size: 1em;

  &:hover {
    color: ${ThemeColor.linkColorHover};
  }
`;

type BlueButtonInput = {
  onClick?: React.MouseEventHandler;
  to?: string;
};

const BlueButton = ({
  children,
  onClick,
  to,
}: PropsWithChildren<BlueButtonInput>) => {
  const navigate = useNavigate();

  if (to)
    return (
      <Bbtn
        onClick={(e) => {
          navigate(to);
        }}
      >
        {children}
      </Bbtn>
    );
  else return <Bbtn onClick={onClick}>{children}</Bbtn>;
};

export default BlueButton;
