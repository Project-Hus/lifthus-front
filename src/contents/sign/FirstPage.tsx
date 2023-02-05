import React from "react";

import { useTranslation } from "react-i18next";
import BigThemeBtn from "../../common/components/buttons/BigThemeBtn";

import Logo from "../../common/components/Logo";

const FirstPage = () => {
  const { t, i18n } = useTranslation();
  return (
    <React.Fragment>
      <Logo mov={true} absolute={true} />
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <BigThemeBtn content={t("sign.first_button")} to="sign" />
    </React.Fragment>
  );
};

export default FirstPage;
