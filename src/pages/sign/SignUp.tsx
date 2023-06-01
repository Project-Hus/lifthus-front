import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import FormInput, {
  IFormInputValues,
} from "../../common/components/forms/FormInput";

import Logo from "../../common/components/Logo";
import { password_limit } from "../../common/constraints";

import { useForm } from "react-hook-form";
import SubmitLink from "../../common/components/links/SubmitLink";

const SignUp = () => {
  const { t, i18n } = useTranslation();

  /* hook-form */
  const { register, handleSubmit, watch, getValues } =
    useForm<IFormInputValues>({ shouldUseNativeValidation: true });

  /* component states */
  const [failed, setFailed] = useState(false);
  const [fid, setFid] = useState(false);

  return (
    <>
      <Logo to="/sign" />
      <form onSubmit={handleSubmit(() => {})}>
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
            <SubmitLink>{t("sign.SignUp")}</SubmitLink>
          )}
        {failed && !fid && (
          <div style={{ fontSize: "0.7em" }}>{t("sign.signUp_error")}</div>
        )}
      </form>
    </>
  );
};

export default SignUp;
