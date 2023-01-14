import React from "react";

import { useTranslation } from "react-i18next";

import Logo from "../../../common/components/Logo";
import SignInput from "../components/SignInput";
import SignLabel from "../components/SignLabel";

const SignUp = () => {
  const { t, i18n } = useTranslation();
  return (
    <React.Fragment>
      <Logo to="/sign" />
      <SignLabel>{t("ID")}</SignLabel>
      <SignInput>ID</SignInput>
      <SignLabel>{t("Password")}</SignLabel>
      <SignInput>password</SignInput>
      <SignLabel>{t("Check your password")}</SignLabel>
      <SignInput>check password</SignInput>
    </React.Fragment>
  );
};

export default SignUp;
