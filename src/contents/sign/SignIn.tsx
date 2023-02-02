import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import FormInput, {
  IFormInputValues,
} from "../../common/components/forms/FormInput";

import BlueLink from "../../common/components/links/BlueLink";
import Logo from "../../common/components/Logo";
import { password_limit } from "../../common/constraints";
import useAppStore from "../../store/app.zustand";

const SignIn = () => {
  const { t, i18n } = useTranslation();

  const [failed, setFailed] = useState(false);
  const [fid, setFid] = useState(false);

  let navigate = useNavigate();
  let location = useLocation();

  const set_user_info = useAppStore((state) => state.set_user_info);

  /* hook-form */
  const { register, handleSubmit, watch, getValues } = useForm<
    IFormInputValues
  >({
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
        <BlueLink onClick={handleSubmit(onSubmit)}>{t("sign.SignIn")}</BlueLink>
        {failed && !fid && (
          <div style={{ fontSize: "0.7em" }}>{t("sign.signIn_error")}</div>
        )}
      </form>
    </React.Fragment>
  );
};

export default SignIn;
