import { t } from "i18next";
import React from "react";
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
  const total = squat + benchpress + deadlift;
  return (
    <>
      {`무려 체중의 ${(total / bodyweight).toFixed(1)}배를 들어올리는`}
      {
        <p>
          도합 <strong>3대 {total}</strong>의 {nickname}{" "}
          <strong>파워리프터</strong>님!
        </p>
      }
      <BlueButton>{t("WORK OUT")}</BlueButton>
    </>
  );
};

export default RegisterConfirm;
