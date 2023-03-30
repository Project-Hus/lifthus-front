import React, { useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";

import Logo from "../../common/components/Logo";

import BlueLink from "../../common/components/links/BlueLink";

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import BlueSpinner from "../../common/components/spinners/BlueSpinner";
import { HUS_AUTH_URL } from "../../common/routes";

const Sign = () => {
  const { t, i18n } = useTranslation();

  //if the user access Sign page, all the sessions and tokens will be revoked.
  const { isLoading, mutate } = useMutation(async () => {
    const res = await axios.delete(HUS_AUTH_URL + "/auth/session/revoke", {
      withCredentials: true,
    });
    if (res.status === 200) console.log("hus session removed");
  });

  // execute only once
  useEffect(() => {
    mutate();
  }, []);

  return (
    <GoogleOAuthProvider clientId="1028507845637-07t65vf8fs49o4dpaelvefgbj8ov56pn.apps.googleusercontent.com">
      <Logo mov={true} absolute={true} />
      <br />
      <br />
      <br />
      <br />
      <br />
      {isLoading ? (
        <BlueSpinner />
      ) : (
        <GoogleLogin
          text="continue_with"
          ux_mode="redirect"
          login_uri={HUS_AUTH_URL + "/auth/social/google/lifthus"}
          onSuccess={() => {}}
          auto_select={true}
        />
      )}
      <br />

      <BlueLink to="/sign/in">{t("sign.SignIn")}</BlueLink>
      <BlueLink to="/sign/up">{t("sign.SignUp")}</BlueLink>
      {/* Google One Tab Login */}
    </GoogleOAuthProvider>
  );
};

export default Sign;
