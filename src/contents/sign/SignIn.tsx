import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import { SignParams } from "../../api/interfacaes/authApi.interface";
import { StatusInfo, statusInfo } from "../../api/interfacaes/statusCode";
import userApi from "../../api/userApi";
import FormInput, {
  IFormInputValues,
} from "../../common/components/forms/FormInput";

import SubmitLink from "../../common/components/links/SubmitLink";
import Logo from "../../common/components/Logo";
import BlueSpinner from "../../common/components/spinners/BlueSpinner";
import { password_limit } from "../../common/constraints";
import useUserStore from "../../store/user.zustand";

const SignIn = () => {
  const { t, i18n } = useTranslation();

  const [failed, setFailed] = useState(false);
  const [fid, setFid] = useState(false);

  let navigate = useNavigate();
  let location = useLocation();

  const set_user_info = useUserStore((state) => state.set_user_info);

  /* hook-form */
  const { register, handleSubmit, watch, getValues } =
    useForm<IFormInputValues>({
      shouldUseNativeValidation: true,
    });

  /* api */
  const { mutate, isLoading, data } = useMutation(
    ({ user_id, password }: SignParams) => {
      return authApi.sign_in_local({
        user_id,
        password,
      });
    },
    {
      onError: async (err: StatusInfo) => {
        if (err === statusInfo.fail.NotAcceptable) setFid(true);
        else setFailed(true);
      },
    }
  );

  const user_id = data?.user_id;
  const { isLoading: isLoading2 } = useQuery({
    queryKey: ["reps", user_id],
    queryFn: async () =>
      typeof user_id === "undefined"
        ? Promise.reject(new Error("undefined"))
        : await userApi.get_user_info({ user_id }),
    onSuccess: async (data) => {
      await set_user_info(data);
      if (data.registered) navigate("/");
      else navigate("/register");
    },
    enabled: !!user_id,
  });

  // onSubmit
  const onSubmit: SubmitHandler<IFormInputValues> = () => {
    mutate({ user_id: getValues("id"), password: getValues("password") });
  };
  return (
    <>
      <Logo to="/sign" />
      {location.state?.from === "/sign/up" && (
        <div style={{ marginTop: "0.5em" }}>{t("sign.welcome_message")}</div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          {...register("id", {
            required: true,
            minLength: password_limit.min,
            maxLength: password_limit.max,
            onChange: (e) => {
              setFailed(false);
              setFid(false);
            },
          })}
          label={t("sign.ID")}
          placeholder="ID"
          focusString={t("characterLimit_message", {
            min: password_limit.min,
            max: password_limit.max,
          })}
        />
        {fid === true && (
          <div style={{ fontSize: "0.6em" }}>{t("sign.noId_error")}</div>
        )}
        <FormInput
          {...register("password", {
            required: true,
            minLength: password_limit.min,
            maxLength: password_limit.max,
            onChange: (e) => {
              setFailed(false);
            },
          })}
          label={t("sign.Password")}
          type="password"
          placeholder="password"
          focusString={t("characterLimit_message", {
            min: password_limit.min,
            max: password_limit.max,
          })}
        />
        <div>&nbsp;</div>
        {isLoading || isLoading2 ? (
          <BlueSpinner />
        ) : (
          <SubmitLink>{t("sign.SignIn")}</SubmitLink>
        )}
        {failed && !fid && (
          <div style={{ fontSize: "0.7em" }}>{t("sign.signIn_error")}</div>
        )}
      </form>
    </>
  );
};

export default SignIn;
