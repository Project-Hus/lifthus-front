import React, { useState } from "react";

import { useTranslation } from "react-i18next";

import Logo from "../../common/components/Logo";

import BlueLink from "../../common/components/links/BlueLink";

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const Sign = () => {
  const { t, i18n } = useTranslation();

  const [googleSelected, setGoogleSelected] = useState(false);

  return (
    <GoogleOAuthProvider clientId="199526293983-r0b7tpmbpcc8nb786v261e451i2vihu3.apps.googleusercontent.com">
      <Logo mov={true} absolute={true} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <GoogleLogin
        text="continue_with"
        ux_mode="redirect"
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        auto_select={true}
      />
      <br />
      <BlueLink to="/sign/in">{t("sign.SignIn")}</BlueLink>
      <BlueLink to="/sign/up">{t("sign.SignUp")}</BlueLink>
      {/* Google One Tab Login */}
    </GoogleOAuthProvider>
  );
};

export default Sign;
