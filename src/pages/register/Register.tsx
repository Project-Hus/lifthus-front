import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router-dom";

import BlueButton from "../../common/components/buttons/BlueButton";
import Logo from "../../common/components/Logo";

import useUserStore from "../../store/user.zustand";

import RegisterBenchpress from "./RegisterBenchpress";
import RegisterBodyWeight from "./RegisterBodyWeight";
import RegisterConfirm from "./RegisterConfirm";
import RegisterDeadlift from "./RegisterDeadlift";
import RegisterHeight from "./RegisterHeight";
import RegisterUsername from "./RegisterUsername";
import RegisterSquat from "./RegisterSquat";
import RegisterType from "./RegisterType";

import FlexCenterLayout from "../../common/components/layouts/FlexCenterLayout";

const Register = () => {
  const { t, i18n } = useTranslation();
  const givenName = useUserStore((state) => state.given_name);
  return (
    <FlexCenterLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <Logo to="/register" mov={true} absolute={true} />
              <br />
              <br />
              <br />
              <br />
              <br />
              <p style={{ zIndex: 1 }}>
                {t("register.Hi")} {t("name_var", { name: givenName })},<br />
                {t("register.workOut_message")}
              </p>
              <BlueButton to="username">{t("register.WORK_OUT")}</BlueButton>
            </>
          }
        />
        <Route path="/username" element={<RegisterUsername />} />
        <Route path="/type" element={<RegisterType />} />
        <Route path="/bodyweight" element={<RegisterBodyWeight />} />
        <Route path="/height" element={<RegisterHeight />} />
        <Route path="/squat" element={<RegisterSquat />} />
        <Route path="/benchpress" element={<RegisterBenchpress />} />
        <Route path="/deadlift" element={<RegisterDeadlift />} />
        <Route path="/confirm" element={<RegisterConfirm />} />

        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    </FlexCenterLayout>
  );
};

export default Register;
