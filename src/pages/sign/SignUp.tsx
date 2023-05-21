import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import FormInput, {
  IFormInputValues,
} from "../../common/components/forms/FormInput";

import Logo from "../../common/components/Logo";
import { password_limit } from "../../common/constraints";
import { useLocation, useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";

import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { SignParams } from "../../api/interfaces/authApi.interface";
import BlueSpinner from "../../common/components/spinners/BlueSpinner";
import { StatusInfo } from "../../api/interfaces/statusInfo.interface";
import statusInfo from "../../api/interfaces/statusInfo.json";
import SubmitLink from "../../common/components/links/SubmitLink";

const SignUp = () => {
  const { t, i18n } = useTranslation();

  let navigate = useNavigate();
  const { pathname } = useLocation();

  /* hook-form */
  const { register, handleSubmit, watch, getValues } =
    useForm<IFormInputValues>({ shouldUseNativeValidation: true });

  /* component states */
  const [failed, setFailed] = useState(false);
  const [fid, setFid] = useState(false);

  /* api */
  const { mutate, isLoading } = useMutation(
    ({ username, password }: SignParams) => {
      return authApi.signUpLocal({
        username,
        password,
      });
    },
    {
      onSuccess: () => {
        navigate("/sign/in", { state: { from: pathname } });
      },
      onError: (err: StatusInfo) => {
        if (err === statusInfo.fail.Conflict) setFid(true);
        else setFailed(true);
      },
    }
  );

  // onSubmit
  const onSubmit: SubmitHandler<IFormInputValues> = () => {
    mutate({ username: getValues("id"), password: getValues("password") });
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
          (watch("password") || "").length >= password_limit.min &&
          (isLoading ? (
            <BlueSpinner />
          ) : (
            <SubmitLink>{t("sign.SignUp")}</SubmitLink>
          ))}
        {failed && !fid && (
          <div style={{ fontSize: "0.7em" }}>{t("sign.signUp_error")}</div>
        )}
      </form>
    </>
  );
};

export default SignUp;
