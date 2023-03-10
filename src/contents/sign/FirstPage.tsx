import styled from "@emotion/styled";
import React from "react";

import { useTranslation } from "react-i18next";
import { Route, Routes, useParams } from "react-router";
import BigThemeBtn from "../../common/components/buttons/BigThemeBtn";
import ErrorPage from "../../common/components/ErrorPage";

import Logo from "../../common/components/Logo";

import Sign from "./Sign";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import FlexCenterLayout from "../../common/components/layouts/FlexCenterLayout";
import SignSession from "./SignSession";

const FirstPage = () => {
  const { t, i18n } = useTranslation();

  return (
    <FlexCenterLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <Logo mov={true} absolute={true} />
              <br />
              <BigThemeBtn content={t("sign.first_button")} to="sign" />
            </>
          }
        />
        <Route path="/sign/" element={<Sign />} />
        <Route path="/sign/in" element={<SignIn />} />
        <Route path="/sign/up" element={<SignUp />} />
        <Route path="/hus/session/:session" element={<SignSession />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </FlexCenterLayout>
  );
};

export default FirstPage;
