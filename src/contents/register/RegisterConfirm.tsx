import { t } from "i18next";
import React from "react";
import { Trans } from "react-i18next";
import { useNavigate } from "react-router";
import authApi from "../../api/authApi";
import registerApi from "../../api/registerApi";
import BlueButton from "../../common/components/buttons/BlueButton";
import useAppStore from "../../store/app.zustand";
import useRegisterStore from "../../store/register.zustand";

const RegisterConfirm = () => {
  const { user_id, set_user_info } = useAppStore((state) => ({
    user_id: state.user_id,
    set_user_info: state.set_user_info,
  }));
  const register_info = useRegisterStore((state) => ({
    user_id: "",
    nickname: state.register_nickname,
    training_type: state.register_type,
    body_weight: state.register_bodyweight,
    height: state.register_height,
    squat: state.register_squat,
    benchpress: state.register_benchpress,
    deadlift: state.register_deadlift,
  }));

  register_info["user_id"] = user_id;

  const navigate = useNavigate();

  const total =
    register_info.squat * 1 +
    register_info.benchpress * 1 +
    register_info.deadlift * 1;
  return (
    <>
      {
        <Trans
          i18nKey={"register.welcome_message"}
          values={{
            weight_ratio: (total / register_info.body_weight).toFixed(1),
            total: total,
            nickname: register_info.nickname,
          }}
        />
      }
      <BlueButton
        onClick={async (e) => {
          const ok = await registerApi.register(register_info);
          await set_user_info(await authApi.get_user_info(user_id));
          if (ok) {
            navigate("/");
          }
        }}
      >
        {t("WORK OUT")}
      </BlueButton>
    </>
  );
};

export default RegisterConfirm;
