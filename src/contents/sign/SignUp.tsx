import React, { ChangeEvent, useState } from "react";

import { useTranslation } from "react-i18next";
import FormLabel from "../../common/components/forms/FormLabel";
import FormInput from "../../common/components/forms/FormInput";

import Logo from "../../common/components/Logo";
import { password_limit } from "../../common/constants";
import { useLocation, useNavigate } from "react-router-dom";
import BlueLink from "../../common/components/links/BlueLink";
import authApi from "../../api/authApi";

import { SubmitHandler, useForm } from "react-hook-form";

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
  type Inputs = {
    id: string;
    password: string;
    check: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    const res = authApi.sign_up_local({ id: id, password: pw });
    if (res.ok === true) navigate("/sign/in", { state: { from: pathname } });
    // if the user arrives right after signing up, there will be a welcome message.
    else {
      if (res.fid === true) setFid(true);
      setFailed(true);
    }
  };
  return (
    <React.Fragment>
      <Logo to="/sign" relative={true} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel>{t("ID")}</FormLabel>
        <FormInput
          {...register("id", { required: true })}
          minLength={password_limit.min}
          maxLength={password_limit.max}
          focusString={t("*character limit", {
            min: password_limit.min,
            max: password_limit.max,
          })}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setID(e.currentTarget.value);
            setFailed(false);
            setFid(false);
          }}
        >
          ID
        </FormInput>
        {fid === true && (
          <div style={{ fontSize: "0.6em" }}>{t("ID already exists")}</div>
        )}
        <FormLabel>{t("Password")}</FormLabel>
        <FormInput
          {...register("password", { required: true })}
          minLength={password_limit.min}
          maxLength={password_limit.max}
          focusString={t("*character limit", {
            min: password_limit.min,
            max: password_limit.max,
          })}
          type="password"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPW(e.currentTarget.value);
            setFailed(false);
            setFid(false);
          }}
        >
          password
        </FormInput>
        <FormLabel>{t("Check your password")}</FormLabel>
        <FormInput
          {...register("check", { required: true })}
          minLength={password_limit.min}
          maxLength={password_limit.max}
          focusString={t("*character limit", {
            min: password_limit.min,
            max: password_limit.max,
          })}
          type="password"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setCheckPW(e.currentTarget.value);
            setFailed(false);
            setFid(false);
          }}
        >
          check password
        </FormInput>
        <div>&nbsp;</div>
        {id.length > 3 && checkPW === pw && pw.length > 3 && (
          <BlueLink onClick={onSubmit}>{t("Sign up")}</BlueLink>
        )}
        {failed === true && (
          <div style={{ fontSize: "0.7em" }}>{t("Failed to sign up")}</div>
        )}
      </form>
    </React.Fragment>
  );
};

export default SignUp;
