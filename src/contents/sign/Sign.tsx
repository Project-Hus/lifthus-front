import React from "react";

import { useTranslation } from "react-i18next";

import Logo from "../../common/components/Logo";

import ButtonGoogle from "./components/ButtonGoogle";
import BlueLink from "../../common/components/links/BlueLink";

const Sign = () => {
  const { t, i18n } = useTranslation();
  return (
    <React.Fragment>
      <Logo mov={true} />
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <ButtonGoogle to="/error" />
      <p></p>
      <BlueLink to="/sign/in">{t("sign.SignIn")}</BlueLink>
      <BlueLink to="/sign/up">{t("sign.SignUp")}</BlueLink>
    </React.Fragment>
  );
};

export default Sign;
