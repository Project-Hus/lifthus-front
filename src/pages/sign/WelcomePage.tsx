import React from "react";

import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import BigThemeBtn from "../../common/components/buttons/BigThemeBtn";
import Logo from "../../common/components/Logo";
import FlexCenterLayout from "../../common/components/layouts/FlexCenterLayout";
import { useSearchParams } from "react-router-dom";
import { LIFTHUS_AUTH_URL, LIFTHUS_FRONT_URL } from "../../common/routes";

const WelcomePage = () => {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const workout = searchParams.get("workout") || LIFTHUS_AUTH_URL;
  const targetURL =
    workout === LIFTHUS_FRONT_URL + "/welcome" ? LIFTHUS_FRONT_URL : workout;

  return (
    <FlexCenterLayout>
      <>
        <Logo mov={true} absolute={true} />
        <br />
        <BigThemeBtn content={t("sign.welcome_button")} to={targetURL} />
      </>
    </FlexCenterLayout>
  );
};

export default WelcomePage;
