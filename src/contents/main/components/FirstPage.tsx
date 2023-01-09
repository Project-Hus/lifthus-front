import React from "react";

import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

import Logo from "../../../common/components/Logo";
import BigThemeBtn from "../../../common/components/BigThemeBtn";

const FirstPage = () => {
  const { t, i18n } = useTranslation();
  return (
    <React.Fragment>
      <Logo mov={true} />
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <BigThemeBtn content={t("Work out!")} to="sign" />
    </React.Fragment>
  );
};

export default FirstPage;
