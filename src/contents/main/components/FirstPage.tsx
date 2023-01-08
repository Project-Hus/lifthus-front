import React from "react";

import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

import Logo from "../../../logo.svg";

const FirstPage = () => {
  const { t, i18n } = useTranslation();
  return (
    <React.Fragment>
      <p>&nbsp</p>
      <p>&nbsp</p>
      <Link to="sign">
        <button>{t("Work out!")}</button>
      </Link>
    </React.Fragment>
  );
};

export default FirstPage;
