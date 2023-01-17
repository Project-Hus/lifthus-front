import React, { ChangeEvent, useState } from "react";

import { useTranslation } from "react-i18next";
import FormLabel from "../../common/components/forms/FormLabel";
import FormInput from "../../common/components/forms/FormInput";

import Logo from "../../common/components/Logo";
import { password_limit } from "../../common/constants";
import { useNavigate } from "react-router-dom";
import BlueLink from "../../common/components/links/BlueLink";
import authApi from "../../common/api/authApi";

const SignUp = () => {
  const { t, i18n } = useTranslation();

  const [id, setID] = useState("");
  const [pw, setPW] = useState("");
  const [checkPW, setCheckPW] = useState("");

  const [failed, setFailed] = useState(false);
  const [fid, setFid] = useState(false);

  let navigate = useNavigate();

  return (
    <React.Fragment>
      <Logo to="/sign" relative={true} />
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
        <div style={{ fontSize: "0.6em" }}>{t("ID already exists")}</div>
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
      <FormLabel>{t("Check your password")}</FormLabel>
      <FormInput
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
        <BlueLink
          onClick={() => {
            const res = authApi.sign_up_local({ id: id, password: pw });
            if (res.ok === true) navigate("/sign/in");
            else {
              if (res.fid === true) setFid(true);
              setFailed(true);
            }
          }}
        >
          {t("Sign up")}
        </BlueLink>
      )}
      {failed === true && (
        <div style={{ fontSize: "0.7em" }}>{t("Failed to sign up")}</div>
      )}
    </React.Fragment>
  );
};

export default SignUp;
