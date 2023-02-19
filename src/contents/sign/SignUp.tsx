import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import FormInput, {
  IFormInputValues,
} from "../../common/components/forms/FormInput";

import Logo from "../../common/components/Logo";
import { password_limit } from "../../common/constraints";
import { useLocation, useNavigate } from "react-router-dom";
import BlueLink from "../../common/components/links/BlueLink";
import authApi from "../../api/authApi";

import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { SignParams } from "../../api/interfacaes/authApi.interface";

const SignUp = () => {
  const { t, i18n } = useTranslation();

  let navigate = useNavigate();
  const { pathname } = useLocation();

  /* hook-form */
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<IFormInputValues>({ shouldUseNativeValidation: true });

  /* component states */
  const [failed, setFailed] = useState(false);
  const [fid, setFid] = useState(false);

  /* api */
  const {
    mutate,
    data: signUpResp,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: ({ user_id, password }: SignParams) => {
      return authApi.sign_up_local({
        user_id,
        password,
      });
    },
  });

  const err = error as Error;
  const onSubmit: SubmitHandler<IFormInputValues> = (data) => {
    mutate({ user_id: getValues("id"), password: getValues("password") });
    if (isSuccess) {
      // if the user arrives right after signing up, there will be a welcome message.
      navigate("/sign/in", { state: { from: pathname } });
    }
    if (isError) {
      if (err.toString() === "existing_id") setFid(true);
      else setFailed(true);
    }
  };
  return (
    <>
      <Logo to="/sign" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label={t("sign.ID")}
          placeholder="ID"
          focusString={t("characterLimit_message", {
            min: password_limit.min,
            max: password_limit.max,
          })}
          {...register("id", {
            required: true,
            minLength: password_limit.min,
            maxLength: password_limit.max,
            onChange: (e) => {
              setFid(false);
              setFailed(false);
            },
          })}
        />
        {fid === true && (
          <div style={{ fontSize: "0.6em" }}>{t("sign.existingId_error")}</div>
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
        <FormInput
          {...register("check", {
            required: true,
            minLength: password_limit.min,
            maxLength: password_limit.max,
            onChange: (e) => {
              setFailed(false);
            },
          })}
          label={t("sign.checkPassword_phrase")}
          type="password"
          placeholder="check password"
          focusString={t("characterLimit_message", {
            min: password_limit.min,
            max: password_limit.max,
          })}
        />
        <div>&nbsp;</div>
        {(watch("id") || "").length >= password_limit.min &&
          (watch("check") || "") === (watch("password") || "") &&
          (watch("password") || "").length >= password_limit.min && (
            <BlueLink onClick={handleSubmit(onSubmit)}>
              {t("sign.SignUp")}
            </BlueLink>
          )}
        {failed && !fid && (
          <div style={{ fontSize: "0.7em" }}>{t("sign.signUp_error")}</div>
        )}
      </form>
    </>
  );
};

export default SignUp;
