import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import FormInput, {
  IFormInputValues,
} from "../../common/components/forms/FormInput";

import SubmitLink from "../../common/components/links/SubmitLink";
import Logo from "../../common/components/Logo";
import { password_limit } from "../../common/constraints";

const SignIn = () => {
  const { t, i18n } = useTranslation();

  const [failed, setFailed] = useState(false);
  const [fid, setFid] = useState(false);

  let location = useLocation();

  /* hook-form */
  const { register, handleSubmit, watch, getValues } =
    useForm<IFormInputValues>({
      shouldUseNativeValidation: true,
    });

  return (
    <>
      <Logo to="/sign" />
      {location.state?.from === "/sign/up" && (
        <div style={{ marginTop: "0.5em" }}>{t("sign.welcome_message")}</div>
      )}
      <form onSubmit={handleSubmit(() => {})}>
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
        <SubmitLink>{t("sign.SignIn")}</SubmitLink>
        {failed && !fid && (
          <div style={{ fontSize: "0.7em" }}>{t("sign.signIn_error")}</div>
        )}
      </form>
    </>
  );
};

export default SignIn;
