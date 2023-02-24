import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import Logo from "../../common/components/Logo";

import ButtonGoogle from "./components/ButtonGoogle";
import BlueLink from "../../common/components/links/BlueLink";

const Sign = () => {
  const { t, i18n } = useTranslation();

  const [googleSelected, setGoogleSelected] = useState(false);

  useEffect(() => {
    if (
      document.querySelector(
        `script[src="https://accounts.google.com/gsi/client"]`
      )
    )
      return;
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    const script2 = document.createElement("script");
    script2.src = "/public/callbacks/googleCallback.js";
    script2.async = true;
    script2.defer = true;
    document.body.appendChild(script2);
  });

  return (
    <>
      <Logo mov={true} absolute={true} />
      <br />
      <br />
      <br />
      <ButtonGoogle onClick={() => setGoogleSelected(!googleSelected)}>
        {t("sign.GoogleLogin")}
      </ButtonGoogle>
      <BlueLink to="/sign/in">{t("sign.SignIn")}</BlueLink>
      <BlueLink to="/sign/up">{t("sign.SignUp")}</BlueLink>
      {/* Google One Tab Login */}

      <div
        id="g_id_onload"
        data-client_id="199526293983-r0b7tpmbpcc8nb786v261e451i2vihu3.apps.googleusercontent.com"
        data-context="signin"
        data-callback="googleCallback"
        data-auto_select="true"
        data-itp_support="true"
      ></div>
    </>
  );
};

export default Sign;
