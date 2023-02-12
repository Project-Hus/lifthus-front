import React from "react";

import { useTranslation } from "react-i18next";

import Logo from "../../common/components/Logo";

import ButtonGoogle from "./components/ButtonGoogle";
import BlueLink from "../../common/components/links/BlueLink";
import SignDiv from "./components/SignDiv";

const Sign = () => {
  const { t, i18n } = useTranslation();
  return (
    <SignDiv>
      <Logo mov={true} absolute={true} />
      <br />
      <br />
      <ButtonGoogle to="/error" />
      <BlueLink to="/sign/in">{t("sign.SignIn")}</BlueLink>
      <BlueLink to="/sign/up">{t("sign.SignUp")}</BlueLink>
    </SignDiv>
  );
};

export default Sign;
