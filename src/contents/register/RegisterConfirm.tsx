import { t } from "i18next";
import React from "react";
import { Trans } from "react-i18next";
import { useNavigate } from "react-router";
import registerApi from "../../api/registerApi";
import userApi from "../../api/userApi";
import BlueButton from "../../common/components/buttons/BlueButton";
import useUserStore from "../../store/user.zustand";
import useRegisterStore from "../../store/register.zustand";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RegisterParams } from "../../api/interfaces/registerApi.interface";
import BlueSpinner from "../../common/components/spinners/BlueSpinner";

const RegisterConfirm = () => {
  const { user_id, set_user_info } = useUserStore((state) => ({
    user_id: state.user_id,
    set_user_info: state.set_user_info,
  }));
  const register_info = useRegisterStore((state) => ({
    user_id: "",
    username: state.register_username,
    training_type: state.register_type,
    body_weight: state.register_bodyweight,
    height: state.register_height,
    squat: state.register_squat,
    benchpress: state.register_benchpress,
    deadlift: state.register_deadlift,
  }));

  register_info["user_id"] = user_id;

  const navigate = useNavigate();

  const { mutate, isLoading, data } = useMutation(
    async (register_info: RegisterParams) => registerApi.register(register_info)
  );

  const user_id_m = data?.user_id;
  const { isLoading: isLoading2, fetchStatus } = useQuery({
    queryKey: ["user_info", user_id_m],
    queryFn: () => userApi.get_user_info({ user_id }),
    onSuccess: (data) => {
      set_user_info(data);
      navigate("/");
    },
    enabled: !!user_id_m,
  });

  const onClick = () => {
    mutate(register_info);
  };

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
            username: register_info.username,
          }}
        />
      }
      {isLoading || (isLoading2 && fetchStatus == "fetching") ? (
        <BlueSpinner />
      ) : (
        <BlueButton onClick={onClick}>{t("WORK OUT")}</BlueButton>
      )}
    </>
  );
};

export default RegisterConfirm;
