import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import FormInput, {
  IFormInputValues,
} from "../../common/components/forms/FormInput";

import Logo from "../../common/components/Logo";
import { PASSWORD_LIMIT } from "../../common/constraints";

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
            min: PASSWORD_LIMIT.MIN,
            max: PASSWORD_LIMIT.MAX,
          })}
          {...register("id", {
            required: true,
            minLength: PASSWORD_LIMIT.MIN,
            maxLength: PASSWORD_LIMIT.MAX,
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
            minLength: PASSWORD_LIMIT.MIN,
            maxLength: PASSWORD_LIMIT.MAX,
            onChange: (e) => {
              setFailed(false);
            },
          })}
          label={t("sign.Password")}
          type="password"
          placeholder="password"
          focusString={t("characterLimit_message", {
            min: PASSWORD_LIMIT.MIN,
            max: PASSWORD_LIMIT.MAX,
          })}
        />
        <FormInput
          {...register("check", {
            required: true,
            minLength: PASSWORD_LIMIT.MIN,
            maxLength: PASSWORD_LIMIT.MAX,
            onChange: (e) => {
              setFailed(false);
            },
          })}
          label={t("sign.checkPassword_phrase")}
          type="password"
          placeholder="check password"
          focusString={t("characterLimit_message", {
            min: PASSWORD_LIMIT.MIN,
            max: PASSWORD_LIMIT.MAX,
          })}
        />
        <div>&nbsp;</div>
        {(watch("id") || "").length >= PASSWORD_LIMIT.MIN &&
          (watch("check") || "") === (watch("password") || "") &&
          (watch("password") || "").length >= PASSWORD_LIMIT.MIN && (
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
