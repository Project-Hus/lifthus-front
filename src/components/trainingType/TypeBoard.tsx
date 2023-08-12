import styled from "@emotion/styled";
import React from "react";
import { ThemeColor } from "../../common/styles/theme.style";

const TypeBoard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row: auto auto;
  grid-column-gap: 1.5rem;
  grid-row-gap: 1.5rem;

  overflow-y: auto;
  max-height: 53vh;
  padding: 0.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;

  border-top: solid 0.2em ${ThemeColor.backgroundColorDarker};
  border-bottom: solid 0.2em ${ThemeColor.backgroundColorDarker};

  &::-webkit-scrollbar {
    width: 0.25rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${ThemeColor.topButtonColor};
  }
  &::-webkit-scrollbar-track {
    background-color: ${ThemeColor.backgroundColor};
  }
`;

export default TypeBoard;
