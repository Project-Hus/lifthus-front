import React from "react";
import { useTranslation } from "react-i18next";
import RegisterNumber from "./components/RegisterNumber";

const RegisterBenchpress = () => {
  const { t, i18n } = useTranslation();
  return (
    <RegisterNumber
      take={"register_benchpress"}
      content={<>{t("What is your max benchpress weight?")}</>}
      unit={"kg"}
      min={0}
      max={500}
      next="/register/deadlift"
    />
  );
};

export default RegisterBenchpress;
