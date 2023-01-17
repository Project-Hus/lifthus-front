import React from "react";

import { useTranslation } from "react-i18next";
import BigThemeBtn from "../../common/components/buttons/BigThemeBtn";

import Logo from "../../common/components/Logo";

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
