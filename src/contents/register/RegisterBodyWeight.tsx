import { t } from "i18next";
import React from "react";
import RegisterNumber from "./components/RegisterNumber";

const RegisterBodyWeight = () => {
  return (
    <RegisterNumber
      take={"register_bodyweight"}
      content={<>{t("How much do you weigh?")}</>}
      unit={"kg"}
      min={0}
      max={300}
      next="/register/height"
    />
  );
};

export default RegisterBodyWeight;
