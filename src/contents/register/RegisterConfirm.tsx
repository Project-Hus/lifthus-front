import { t } from "i18next";
import React from "react";
import { Trans } from "react-i18next";
import BlueButton from "../../common/components/buttons/BlueButton";
import useRegisterStore from "../../store/register.zustand";

const RegisterConfirm = () => {
  const {
    nickname,
    lifting_type,
    bodyweight,
    height,
    squat,
    benchpress,
    deadlift,
  } = useRegisterStore((state) => ({
    nickname: state.register_nickname,
    lifting_type: state.register_type,
    bodyweight: state.register_bodyweight,
    height: state.register_height,
    squat: state.register_squat,
    benchpress: state.register_benchpress,
    deadlift: state.register_deadlift,
  }));
  const total = squat * 1 + benchpress * 1 + deadlift * 1;
  return (
    <>
      {
        <Trans
          i18nKey={"register.welcome_message"}
          values={{
            weight_ratio: (total / bodyweight).toFixed(1),
            total: total,
            nickname: nickname,
          }}
        />
      }
      <BlueButton>{t("WORK OUT")}</BlueButton>
    </>
  );
};

export default RegisterConfirm;
