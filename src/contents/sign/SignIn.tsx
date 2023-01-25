import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import FormInput from "../../common/components/forms/FormInput";

import BlueLink from "../../common/components/links/BlueLink";
import Logo from "../../common/components/Logo";
import { password_limit } from "../../common/constants";
import useAppStore from "../../store/app.zustand";

const SignIn = () => {
  const { t, i18n } = useTranslation();

  const [failed, setFailed] = useState(false);
  const [fid, setFid] = useState(false);

  let navigate = useNavigate();
  let location = useLocation();

  const set_user_info = useAppStore((state) => state.set_user_info);

  /* hook-form */
  const { register, handleSubmit, watch, getValues } = useForm({
    shouldUseNativeValidation: true,
  });
  const onSubmit = () => {
    const res = authApi.sign_in_local({
      id: getValues("id"),
      password: getValues("password"),
    });
    if (res.ok === true) {
      const user_info = authApi.get_user_info(res.user_id);
      set_user_info(user_info);
      if (user_info.registered) navigate("/");
      else navigate("/register");
    } else {
      if (res.fid === true) setFid(true);
      setFailed(true);
    }
  };

  console.log(watch());
  return (
    <React.Fragment>
      <Logo to="/sign" relative={true} />
      {location.state?.from === "/sign/up" && (
        <div style={{ marginTop: "0.5em" }}>{t("Welcome to join us!")}</div>
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
          label={t("ID")}
          placeholder="ID"
          focusString={t("{{min}} to {{max}} characters", {
            min: password_limit.min,
            max: password_limit.max,
          })}
        />
        {fid === true && (
          <div style={{ fontSize: "0.6em" }}>{t("ID doesn't exists")}</div>
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
          label={t("Password")}
          type="password"
          placeholder="password"
          focusString={t("{{min}} to {{max}} characters", {
            min: password_limit.min,
            max: password_limit.max,
          })}
        />
        <div>&nbsp;</div>
        <BlueLink onClick={handleSubmit(onSubmit)}>{t("Sign in")}</BlueLink>
        {failed && !fid && (
          <div style={{ fontSize: "0.7em" }}>{t("Failed to sign in")}</div>
        )}
      </form>
    </React.Fragment>
  );
};

export default SignIn;
