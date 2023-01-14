import React from "react";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

import styled from "styled-components";

import Logo from "../../../common/components/Logo";
import BlueLink from "../../../common/components/BlueLink";
import ButtonGoogle from "../components/ButtonGoogle";

const Sign = () => {
  const { t, i18n } = useTranslation();
  return (
    <React.Fragment>
      <Logo mov={true} />
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <ButtonGoogle to="/error" />
      <p></p>
      <BlueLink href="/signin">{t("Sign in")}</BlueLink>
      <BlueLink href="/signup">{t("Sign up")}</BlueLink>
    </React.Fragment>
  );
};

export default Sign;
