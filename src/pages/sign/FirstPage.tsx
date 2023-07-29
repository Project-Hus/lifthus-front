import React from "react";

import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router";
import BigThemeBtn from "../../common/components/buttons/BigThemeBtn";
import ErrorPage from "../error/ErrorPage";

import Logo from "../../common/components/Logo";

import Sign from "./Sign";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import FlexCenterLayout from "../../common/components/layouts/FlexCenterLayout";
import { Text } from "@chakra-ui/react";

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
              {/*
              <Text
                style={{ position: "fixed", bottom: "30vh" }}
                fontSize="1em"
              >
                🚧 인증 프로세스 초대형 공사중 🚧
              </Text>
              */}
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
