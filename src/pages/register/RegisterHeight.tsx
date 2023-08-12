import { t } from "i18next";
import React from "react";
import { Trans } from "react-i18next";
import RegisterNumber from "../../components/register/RegisterNumber";

const RegisterHeight = () => {
  return (
    <RegisterNumber
      take={"height"}
      content={<Trans i18nKey={"register.heightAsking_message"} />}
      unit={"cm"}
      min={0}
      max={300}
      next="/register/squat"
      img="https://cdn.pixabay.com/photo/2016/07/29/21/41/school-1555906_1280.png"
      alt="ruller"
    />
  );
};

export default RegisterHeight;
