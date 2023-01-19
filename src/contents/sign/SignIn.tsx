import React, { ChangeEvent, PropsWithChildren, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import FormInput from "../../common/components/forms/FormInput";
import FormLabel from "../../common/components/forms/FormLabel";
import BlueLink from "../../common/components/links/BlueLink";
import Logo from "../../common/components/Logo";
import { password_limit } from "../../common/constants";
import useAppStore from "../../store/app.zustand";

const SignIn = () => {
  const set_id = useAppStore((state) => state.set_id);

  const { t, i18n } = useTranslation();

  const [id, setID] = useState("");
  const [pw, setPW] = useState("");

  const [failed, setFailed] = useState(false);
  const [fid, setFid] = useState(false);

  let navigate = useNavigate();
  let location = useLocation();
  return (
    <React.Fragment>
      <Logo to="/sign" relative={true} />
      {location.state?.from === "/sign/up" && (
        <div style={{ marginTop: "0.5em" }}>{t("Welcome to join us!")}</div>
      )}
      <FormLabel>{t("ID")}</FormLabel>
      <FormInput
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
        <div style={{ fontSize: "0.6em" }}>{t("ID doesn't exists")}</div>
      )}
      <FormLabel>{t("Password")}</FormLabel>
      <FormInput
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
      <div>&nbsp;</div>
      <BlueLink
        onClick={() => {
          const res = authApi.sign_in_local({ id: id, password: pw });
          if (res.ok === true) {
            set_id(res.id);
            navigate("/");
          } else {
            if (res.fid === true) setFid(true);
            setFailed(true);
          }
        }}
      >
        {t("Sign in")}
      </BlueLink>
      {failed && !fid && (
        <div style={{ fontSize: "0.7em" }}>{t("Failed to sign in")}</div>
      )}
    </React.Fragment>
  );
};

export default SignIn;
