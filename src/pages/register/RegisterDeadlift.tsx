import React from "react";
import { Trans, useTranslation } from "react-i18next";
import RegisterNumber from "../../components/register/RegisterNumber";

const RegisterDeadlift = () => {
  const { t, i18n } = useTranslation();
  return (
    <RegisterNumber
      take={"deadlift"}
      content={<Trans i18nKey={"register.deadliftAsking_message"} />}
      pref={t("Max")}
      unit={"kg"}
      min={0}
      max={500}
      next="/register/confirm"
      img="https://thenounproject.com/api/private/icons/4781842/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0"
      alt="deadlift"
    />
  );
};

export default RegisterDeadlift;
