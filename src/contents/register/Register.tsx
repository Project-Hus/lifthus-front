import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router-dom";
import BlueButton from "../../common/components/buttons/BlueButton";
import BlueLink from "../../common/components/links/BlueLink";
import Logo from "../../common/components/Logo";
import useAppStore from "../../store/app.zustand";
import RegisterNickname from "./RegisterNickname";
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
              <p>{t("Hi {{user_id}},", { user_id: user_id })}</p>
              {t("Let's work out!")}
              <BlueButton to="nickname">{t("WORK OUT")}</BlueButton>
            </>
          }
        />
        <Route path="/nickname" element={<RegisterNickname />} />
        <Route path="/type" element={<RegisterType />} />
        <Route path="/weight" element={<div>RegisterBodyWeight</div>} />

        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    </>
  );
};

export default Register;
