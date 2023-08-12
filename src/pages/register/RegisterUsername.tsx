import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import registerApi from "../../api/registerApi";

import FormInput, {
  IFormInputValues,
} from "../../common/components/forms/FormInput";

import Logo from "../../common/components/Logo";
import { username_limit } from "../../common/constraints";

import useUserStore from "../../store/user.zustand";
import useRegisterStore from "../../store/register.zustand";
import { useMutation } from "@tanstack/react-query";
import { RegisterUsernameParams } from "../../api/interfaces/registerApi.interface";
import SubmitLink from "../../common/components/links/SubmitLink";
import { StatusInfo } from "../../api/interfaces/statusInfo.interface";
import statusInfo from "../../api/interfaces/statusInfo.json";
import BlueSpinner from "../../common/components/spinners/BlueSpinner";

const RegisterUsername = () => {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  /* store */
  // current user's UID
  const uid = useUserStore((state) => state.uid);
  // current user's given name
  const given_name = useUserStore((state) => state.given_name);
  // current username registration field
  const tmpUsername = useRegisterStore((state) => state.username);

  // to set current user's username after username registration api call succeeds
  const setUsername = useUserStore((state) => state.setUsername);
  // to reflect current username registration field
  const registerUsername = useRegisterStore((state) => state.registerUsername);

  /* hook-form(for username field) */
  const { register, watch, getValues, handleSubmit } =
    useForm<IFormInputValues>({
      shouldUseNativeValidation: true,
      defaultValues: { username: tmpUsername },
    });

  /* state */
  const [fname, setFname] = useState(false); // failed by existing username
  const [failed, setFailed] = useState(false); // failed by other reasons

  /* api */
  const { mutate, isLoading: regiNameLoading } = useMutation(
    (regiUsername: RegisterUsernameParams) =>
      registerApi.registerUsername(regiUsername),
    {
      onSuccess: () => {
        // set current user's username on success and navigate to next page
        const username = getValues("username");
        registerUsername(username);
        setUsername(username);
        navigate("/register/type");
      },
      onError: (err) => {
        // if username already exists, set fname to true
        // else set failed to true
        const errInfo = err as any;
        if (errInfo.response.status === statusInfo.fail.Conflict.code)
          setFname(true);
        else setFailed(true);
      },
    }
  );

  // on submit(for Enter key), mutate.
  const onSubmit: SubmitHandler<IFormInputValues> = () => {
    mutate({ uid: uid, username: getValues("username") });
  };

  return (
    <>
      <Logo />
      <p>{t("name_var", { name: given_name })},</p>
      <p>
        {!fname && <Trans i18nKey={"register.usernameAsking_message"} />}
        {fname && t("register.existingUsername_error")}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          placeholder={"username"}
          focusString={t("characterLimit_message", { min: 3, max: 16 })}
          {...register("username", {
            required: true,
            minLength: 3,
            maxLength: 16,
            onChange: (e) => {
              setFname(false);
              setFailed(false);
            },
          })}
        />
        {(watch("username") || "").length >= username_limit.min &&
          (regiNameLoading ? (
            <BlueSpinner />
          ) : (
            <SubmitLink>{t("Next")}</SubmitLink>
          ))}
        {failed && !fname && (
          <div style={{ fontSize: "0.7em" }}>
            {t("register.username_error")}
          </div>
        )}
      </form>
    </>
  );
};

export default RegisterUsername;
