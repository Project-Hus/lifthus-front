import React, { useState } from "react";

import { useTranslation } from "react-i18next";

import Logo from "../../common/components/Logo";

import BlueLink from "../../common/components/links/BlueLink";

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import axios from "axios";

const Sign = () => {
  const { t, i18n } = useTranslation();

  // get hus_sid from local storage
  const hus_sid = localStorage.getItem("hus_sid") || "";

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
        login_uri={
          process.env.REACT_APP_HUS_GOOGLE_LOGIN_ENDPOINT + "/" + hus_sid
        }
        onSuccess={(credentialResponse: any) => {
          console.log("authed");
        }}
        auto_select={true}
      />
      <br />

      <button
        onClick={async () => {
          const res = await axios.get("http://api.lifthus.com:9091", {
            withCredentials: true,
          });
          console.log(res.status, res.data);
        }}
      >
        hey
      </button>

      <BlueLink to="/sign/in">{t("sign.SignIn")}</BlueLink>
      <BlueLink to="/sign/up">{t("sign.SignUp")}</BlueLink>
      {/* Google One Tab Login */}
    </GoogleOAuthProvider>
  );
};

export default Sign;
