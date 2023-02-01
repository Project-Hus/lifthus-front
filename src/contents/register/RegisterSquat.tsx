import { t } from "i18next";
import React from "react";
import RegisterNumber from "./components/RegisterNumber";

const RegisterSquat = () => {
  return (
    <RegisterNumber
      take={"register_squat"}
      content={<>{t("What is your max squat weight?")}</>}
      pref={t("Max")}
      unit={"kg"}
      min={0}
      max={500}
      next="/register/benchpress"
    />
  );
};

export default RegisterSquat;
