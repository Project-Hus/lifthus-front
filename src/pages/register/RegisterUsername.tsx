import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import registerApi from "../../api/registerApi";
import userApi from "../../api/userApi";

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
  const uid = useUserStore((state) => state.uid);
  const given_name = useUserStore((state) => state.given_name);
  const registerUsername = useRegisterStore((state) => state.registerUsername);
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const setRegisterInfo = useRegisterStore((state) => state.setRegisterInfo);

  /* hook-form */
  const { register, watch, getValues, handleSubmit } =
    useForm<IFormInputValues>({
      shouldUseNativeValidation: true,
      defaultValues: { username: registerUsername },
    });

  /* state */
  const [fname, setFname] = useState(false);
  const [failed, setFailed] = useState(false);

  /* api */
  const { mutate, isLoading } = useMutation(
    (regiUsername: RegisterUsernameParams) =>
      registerApi.registerUsername(regiUsername),
    {
      onSuccess: () => {
        const username = getValues("username");
        setRegisterInfo({ registerUsername: username });
        setUserInfo({ username });
        navigate("/register/type");
      },
      onError: (err: StatusInfo) => {
        if (err === statusInfo.fail.Conflict) setFname(true);
        else setFailed(true);
      },
    }
  );

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
        ></FormInput>
        <p></p>
        {(watch("username") || "").length >= username_limit.min &&
          (isLoading ? <BlueSpinner /> : <SubmitLink>{t("Next")}</SubmitLink>)}
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
