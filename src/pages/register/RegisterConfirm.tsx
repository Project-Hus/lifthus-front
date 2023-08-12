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
  const { uid, setUserInfo } = useUserStore((state) => ({
    uid: state.uid,
    setUserInfo: state.setUserInfo,
  }));

  const registerInfo = useRegisterStore((state) => ({
    uid: NaN,
    username: state.username,
    trainingType: state.type,
    bodyWeight: state.bodyWeight,
    height: state.height,
    squat: state.squat,
    benchpress: state.benchpress,
    deadlift: state.deadlift,
  }));

  if (uid) registerInfo["uid"] = uid;

  const navigate = useNavigate();

  const { mutate, isLoading, data } = useMutation(
    async (registerInfo: RegisterParams) => registerApi.register(registerInfo)
  );
  // if mutation is successful and got uid, then get user info and set it to store.
  const uidMutated = data?.uid;
  const { isLoading: isLoading2, fetchStatus } = useQuery({
    queryKey: ["user", { uid: uidMutated }],
    queryFn: () =>
      typeof uidMutated === "undefined"
        ? Promise.reject(new Error("undefined"))
        : userApi.getUserInfo({ uid: uidMutated }),
    onSuccess: (data) => {
      setUserInfo(data);
      navigate("/");
    },
    enabled: !!uidMutated,
  });

  const onClick = () => {
    mutate(registerInfo);
  };

  const total =
    registerInfo.squat * 1 +
    registerInfo.benchpress * 1 +
    registerInfo.deadlift * 1;
  return (
    <>
      {
        <Trans
          i18nKey={"register.welcome_message"}
          values={{
            weight_ratio: (total / registerInfo.bodyWeight).toFixed(1),
            total: total,
            username: registerInfo.username,
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
