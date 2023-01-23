import React, { ChangeEvent, PropsWithChildren, useState } from "react";
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

  const [id, setID] = useState("");
  const [pw, setPW] = useState("");

  const [failed, setFailed] = useState(false);
  const [fid, setFid] = useState(false);

  let navigate = useNavigate();
  let location = useLocation();

  const set_user_info = useAppStore((state) => state.set_user_info);

  /* hook-form */
  const { register, handleSubmit } = useForm();
  const onSubmit = () => {
    const res = authApi.sign_in_local({ id: id, password: pw });
    if (res.ok === true) {
      set_user_info(authApi.get_user_info(res.user_id));
      navigate("/");
    } else {
      if (res.fid === true) setFid(true);
      setFailed(true);
    }
  };
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
          })}
          onChange={(e) => {
            return new Promise((resolve, reject) => {
              setID(e.target.value);
              setFailed(false);
              setFid(false);
              resolve(true);
            });
          }}
          label={t("ID")}
          placeholder="ID"
          focusString={t("*character limit", {
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
          })}
          onChange={(e) => {
            return new Promise((resolve, reject) => {
              setPW(e.target.value);
              setFailed(false);
              setFid(false);
              resolve(true);
            });
          }}
          label={t("Password")}
          type="password"
          placeholder="password"
          focusString={t("*character limit", {
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
