import { t } from "i18next";
import React from "react";

import Logo from "./Logo";

const ErrorPage = () => {
  return (
    <React.Fragment>
      <Logo />
      <div>{t("error_page")}</div>
    </React.Fragment>
  );
};

export default ErrorPage;
