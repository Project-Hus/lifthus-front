import React from "react";
import { Trans, useTranslation } from "react-i18next";
import RegisterNumber from "./components/RegisterNumber";

const RegisterBenchpress = () => {
  const { t, i18n } = useTranslation();
  return (
    <RegisterNumber
      take={"registerBenchpress"}
      content={<Trans i18nKey={"register.benchpressAsking_message"} />}
      pref={t("Max")}
      unit={"kg"}
      min={0}
      max={500}
      next="/register/deadlift"
    />
  );
};

export default RegisterBenchpress;
