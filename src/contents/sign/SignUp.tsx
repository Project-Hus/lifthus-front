import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import FormInput from "../../common/components/forms/FormInput";

import Logo from "../../common/components/Logo";
import { password_limit } from "../../common/constants";
import { useLocation, useNavigate } from "react-router-dom";
import BlueLink from "../../common/components/links/BlueLink";
import authApi from "../../api/authApi";

import { SubmitHandler, useForm, UseFormRegisterReturn } from "react-hook-form";

const SignUp = () => {
  const { t, i18n } = useTranslation();

  let navigate = useNavigate();
  const { pathname } = useLocation();

  /* local states */
  const [id, setID] = useState("");
  const [pw, setPW] = useState("");
  const [checkPW, setCheckPW] = useState("");

  const [failed, setFailed] = useState(false);
  const [fid, setFid] = useState(false);

  /* hook-form */
  interface Inputs {
    id: string;
    password: string;
    check: string;
    abc: string;
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(watch("id"));
    const res = authApi.sign_up_local({ id: id, password: pw });
    if (res.ok === true) navigate("/sign/in", { state: { from: pathname } });
    // if the user arrives right after signing up, there will be a welcome message.
    else {
      if (res.fid === true) setFid(true);
      setFailed(true);
    }
  };

  console.log(watch());
  return (
    <React.Fragment>
      <Logo to="/sign" relative={true} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label={t("ID")}
          placeholder="ID"
          focusString={t("*character limit", {
            min: password_limit.min,
            max: password_limit.max,
          })}
          {...register("id", {
            required: true,
            minLength: password_limit.min,
            maxLength: password_limit.max,
          })}
        />
        {fid === true && (
          <div style={{ fontSize: "0.6em" }}>{t("ID already exists")}</div>
        )}
        <FormInput
          {...register("password", {
            required: true,
            minLength: password_limit.min,
            maxLength: password_limit.max,
          })}
          label={t("Password")}
          type="password"
          placeholder="password"
          focusString={t("*character limit", {
            min: password_limit.min,
            max: password_limit.max,
          })}
        />
        <FormInput
          {...register("check", {
            required: true,
            minLength: password_limit.min,
            maxLength: password_limit.max,
          })}
          label={t("Check your password")}
          type="password"
          placeholder="check password"
          focusString={t("*character limit", {
            min: password_limit.min,
            max: password_limit.max,
          })}
        />
        <div>&nbsp;</div>
        {id.length > 3 && checkPW === pw && pw.length > 3 && (
          <BlueLink onClick={handleSubmit(onSubmit)}>{t("Sign up")}</BlueLink>
        )}
        {failed === true && (
          <div style={{ fontSize: "0.7em" }}>{t("Failed to sign up")}</div>
        )}
      </form>
    </React.Fragment>
  );
};

export default SignUp;
