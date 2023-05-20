import { t } from "i18next";
import React from "react";
import { Trans } from "react-i18next";
import RegisterNumber from "./components/RegisterNumber";

const RegisterHeight = () => {
  return (
    <RegisterNumber
      take={"registerHeight"}
      content={<Trans i18nKey={"register.heightAsking_message"} />}
      unit={"cm"}
      min={0}
      max={300}
      next="/register/squat"
    />
  );
};

export default RegisterHeight;
