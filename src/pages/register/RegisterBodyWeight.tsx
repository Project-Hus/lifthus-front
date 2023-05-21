import React from "react";
import { Trans } from "react-i18next";
import RegisterNumber from "./components/RegisterNumber";

const RegisterBodyWeight = () => {
  return (
    <RegisterNumber
      take={"registerBodyWeight"}
      content={<Trans i18nKey={"register.weightAsking_message"} />}
      unit={"kg"}
      min={0}
      max={300}
      next="/register/height"
    />
  );
};

export default RegisterBodyWeight;
