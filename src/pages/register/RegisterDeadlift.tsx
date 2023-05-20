import React from "react";
import { Trans, useTranslation } from "react-i18next";
import RegisterNumber from "./components/RegisterNumber";

const RegisterDeadlift = () => {
  const { t, i18n } = useTranslation();
  return (
    <RegisterNumber
      take={"registerDeadlift"}
      content={<Trans i18nKey={"register.deadliftAsking_message"} />}
      pref={t("Max")}
      unit={"kg"}
      min={0}
      max={500}
      next="/register/confirm"
    />
  );
};

export default RegisterDeadlift;
