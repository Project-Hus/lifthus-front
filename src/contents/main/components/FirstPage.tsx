import React from "react";

import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

import styled from "styled-components";

import Logo from "../../../common/components/Logo";

import { ThemeColor } from "../../../common/styles/theme.style";

const BtnLogin = styled.button`
  position: relative;

  height: 3rem;
  width: 10rem;
  font-size: 1rem;
  background-color: ${ThemeColor.basicColor};
  color: #000766;
  font-weight: bold;
  border: none;
  border-radius: 0.4rem 0.4rem 0.4rem 0.4rem;
  transition: 0.2s;

  box-shadow: 0 0 0.5rem 0.3rem;

  &:hover {
    background-color: ${ThemeColor.basicColorHover};
    box-shadow: 0 0 0.5rem 0.5rem #3d44a7;
  }
`;

const FirstPage = () => {
  const { t, i18n } = useTranslation();
  return (
    <React.Fragment>
      <Logo mov={true} />
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <Link to="sign">
        <BtnLogin>{t("Work out!")}</BtnLogin>
      </Link>
    </React.Fragment>
  );
};

export default FirstPage;
