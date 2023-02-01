import React from "react";
import { useTranslation } from "react-i18next";
import RegisterNumber from "./components/RegisterNumber";

const RegisterDeadlift = () => {
  const { t, i18n } = useTranslation();
  return (
    <RegisterNumber
      take={"register_deadlift"}
      content={<>{t("What is your max deadlift weight?")}</>}
      unit={"kg"}
      min={0}
      max={500}
      next="/register/confirm"
    />
  );
};

export default RegisterDeadlift;
