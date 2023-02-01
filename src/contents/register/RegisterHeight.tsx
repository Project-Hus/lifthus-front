import { t } from "i18next";
import React from "react";
import RegisterNumber from "./components/RegisterNumber";

const RegisterHeight = () => {
  return (
    <RegisterNumber
      take={"register_height"}
      content={<>{t("How tall are you?")}</>}
      unit={"cm"}
      min={0}
      max={300}
      next="/register/squat"
    />
  );
};

export default RegisterHeight;
