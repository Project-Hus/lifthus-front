import React, { useEffect, useRef, useState } from "react";

import { useTranslation } from "react-i18next";

import Logo from "../../common/components/Logo";

import BlueLink from "../../common/components/links/BlueLink";

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import BlueSpinner from "../../common/components/spinners/BlueSpinner";
import {
  HUS_GOOGLE_LOGIN_ENDPOINT,
  LIFTHUS_FRONT_URL,
} from "../../common/routes";
import { useQuery } from "@tanstack/react-query";
import authApi from "../../api/authApi";

const Sign = () => {
  const { t, i18n } = useTranslation();

  // const { isLoading, mutate } = useMutation(async () => {
  //   const res = await axios.delete(HUS_SESSION_REVOKE_ENDPOINT, {
  //     withCredentials: true,
  //   });
  //   if (res.status === 200) console.log("hus session removed");
  // });

  // // execute only once
  // useEffect(() => {
  //   mutate();
  // }, []);

  const { data: csid, isLoading } = useQuery({
    queryKey: ["sid"],
    queryFn: () => authApi.getSID(),
  });

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
          login_uri={
            HUS_GOOGLE_LOGIN_ENDPOINT +
            `?redirect=${encodeURIComponent(LIFTHUS_FRONT_URL)}&csid=${csid}`
          }
          onSuccess={() => {}}
          auto_select={true}
        />
      )}
      <br />

      <BlueLink to="/sign/in">{t("sign.SignIn")}</BlueLink>
      <BlueLink to="/sign/up">{t("sign.SignUp")}</BlueLink>
      <BlueLink
        onClick={() => {
          window.location.href = "https://auth.cloudhus.com/auth/test/cookie";
        }}
      >
        COOKIE TEST
      </BlueLink>
      {/* Google One Tab Login */}
    </GoogleOAuthProvider>
  );
};

export default Sign;
