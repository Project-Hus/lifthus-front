import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router-dom";
import BlueButton from "../../common/components/buttons/BlueButton";
import Logo from "../../common/components/Logo";
import useAppStore from "../../store/app.zustand";
import RegisterNumber from "./components/RegisterNumber";
import RegisterBenchpress from "./RegisterBenchpress";
import RegisterBodyWeight from "./RegisterBodyWeight";
import RegisterConfirm from "./RegisterConfirm";
import RegisterDeadlift from "./RegisterDeadlift";
import RegisterHeight from "./RegisterHeight";
import RegisterNickname from "./RegisterNickname";
import RegisterSquat from "./RegisterSquat";
import RegisterType from "./RegisterType";

const Register = () => {
  const { t, i18n } = useTranslation();

  const user_id = useAppStore((state) => state.user_id);
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <Logo to="/register" mov={true} big={true} />
              <p>&nbsp;</p>
              <p>&nbsp;</p>
              <p>
                {t("register.Hi")} {t("name_var", { name: user_id })},
              </p>
              {t("register.workOut_message")}
              <BlueButton to="nickname">{t("register.WORK_OUT")}</BlueButton>
            </>
          }
        />
        <Route path="/nickname" element={<RegisterNickname />} />
        <Route path="/type" element={<RegisterType />} />
        <Route path="/bodyweight" element={<RegisterBodyWeight />} />
        <Route path="/height" element={<RegisterHeight />} />
        <Route path="/squat" element={<RegisterSquat />} />
        <Route path="/benchpress" element={<RegisterBenchpress />} />
        <Route path="/deadlift" element={<RegisterDeadlift />} />
        <Route path="/confirm" element={<RegisterConfirm />} />

        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    </>
  );
};

export default Register;
