import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import registerApi from "../../api/registerApi";
import userApi from "../../api/userApi";

import FormInput, {
  IFormInputValues,
} from "../../common/components/forms/FormInput";
import BlueLink from "../../common/components/links/BlueLink";
import Logo from "../../common/components/Logo";
import { username_limit } from "../../common/constraints";

import useUserStore from "../../store/user.zustand";
import useRegisterStore from "../../store/register.zustand";

const RegisterUsername = () => {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  /* store */
  const user_id = useUserStore((state) => state.user_id);
  const register_username = useRegisterStore(
    (state) => state.register_username
  );
  const set_user_info = useUserStore((state) => state.set_user_info);
  const set_register_info = useRegisterStore(
    (state) => state.set_register_info
  );

  /* hook-form */
  const { register, watch, getValues } = useForm<IFormInputValues>({
    shouldUseNativeValidation: true,
    defaultValues: { username: register_username },
  });

  /* state */
  const [failed, setFailed] = useState(false);

  return (
    <>
      <Logo />
      <p>{t("name_var", { name: user_id })},</p>
      <p>
        {!failed && <Trans i18nKey={"register.usernameAsking_message"} />}
        {failed && t("register.existingUsername_error")}
      </p>
      <FormInput
        placeholder={"username"}
        focusString={t("characterLimit_message", { min: 3, max: 16 })}
        {...register("username", {
          required: true,
          minLength: 3,
          maxLength: 16,
          onChange: (e) => setFailed(false),
        })}
      ></FormInput>
      <p></p>
      {(watch("username") || "").length >= username_limit.min && (
        <BlueLink
          onClick={(e) => {
            const { ok } = registerApi.register_username({
              id: user_id,
              username: getValues("username"),
            });
            if (ok) {
              set_register_info({ register_username: getValues("username") });
              set_user_info(userApi.get_user_info(user_id));
              navigate("/register/type");
            } else {
              setFailed(true);
            }
          }}
        >
          {t("Next")}
        </BlueLink>
      )}
    </>
  );
};

export default RegisterUsername;
