import { t } from "i18next";
import React from "react";
import { Trans } from "react-i18next";
import RegisterNumber from "./components/RegisterNumber";

const RegisterSquat = () => {
  return (
    <RegisterNumber
      take={"registerSquat"}
      content={<Trans i18nKey={"register.squatAsking_message"} />}
      pref={t("Max")}
      unit={"kg"}
      min={0}
      max={500}
      next="/register/benchpress"
    />
  );
};

export default RegisterSquat;
