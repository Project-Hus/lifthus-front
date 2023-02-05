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

import {
  SubmitHandler,
  useForm,
  UseFormRegister,
  ValidationRule,
} from "react-hook-form";

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

  /* local states */
  const [failed, setFailed] = useState(false);
  const [fid, setFid] = useState(false);

  const onSubmit: SubmitHandler<IFormInputValues> = (data) => {
    const res = authApi.sign_up_local({
      id: getValues("id"),
      password: getValues("password"),
    });
    if (res.ok === true) navigate("/sign/in", { state: { from: pathname } });
    // if the user arrives right after signing up, there will be a welcome message.
    else {
      if (res.fid === true) setFid(true);
      setFailed(true);
    }
  };
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default SignUp;
