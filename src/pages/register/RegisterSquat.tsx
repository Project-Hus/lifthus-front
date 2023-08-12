import { t } from "i18next";
import React from "react";
import { Trans } from "react-i18next";
import RegisterNumber from "../../components/register/RegisterNumber";

const RegisterSquat = () => {
  return (
    <RegisterNumber
      take={"squat"}
      content={<Trans i18nKey={"register.squatAsking_message"} />}
      pref={t("Max")}
      unit={"kg"}
      min={0}
      max={500}
      next="/register/benchpress"
      img="https://freepngimg.com/thumb/gymnastics/172605-squat-silhouette-free-download-png-hq.png"
      alt="squat"
    />
  );
};

export default RegisterSquat;
