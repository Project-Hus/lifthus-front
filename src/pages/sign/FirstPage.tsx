import React from "react";

import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router";
import BigThemeBtn from "../../common/components/buttons/BigThemeBtn";
import ErrorPage from "../ErrorPage";

import Logo from "../../common/components/Logo";

import Sign from "./Sign";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import FlexCenterLayout from "../../common/components/layouts/FlexCenterLayout";

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
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </FlexCenterLayout>
  );
};

export default FirstPage;
