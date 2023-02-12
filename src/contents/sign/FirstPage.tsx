import styled from "@emotion/styled";
import React from "react";

import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router";
import BigThemeBtn from "../../common/components/buttons/BigThemeBtn";
import ErrorPage from "../../common/components/ErrorPage";

import Logo from "../../common/components/Logo";
import SignDiv from "./components/SignDiv";
import Sign from "./Sign";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const FirstPage = () => {
  const { t, i18n } = useTranslation();
  return (
    <SignDiv>
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
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </SignDiv>
  );
};

export default FirstPage;
