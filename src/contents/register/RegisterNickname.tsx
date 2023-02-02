import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import registerApi from "../../api/registerApi";

import FormInput, {
  IFormInputValues,
} from "../../common/components/forms/FormInput";
import BlueLink from "../../common/components/links/BlueLink";
import Logo from "../../common/components/Logo";
import { nickname_limit } from "../../common/constraints";

import useAppStore from "../../store/app.zustand";
import useRegisterStore from "../../store/register.zustand";

const RegisterNickname = () => {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  /* store */
  const user_id = useAppStore((state) => state.user_id);
  const register_nickname = useRegisterStore(
    (state) => state.register_nickname
  );
  const set_user_info = useAppStore((state) => state.set_user_info);
  const set_register_info = useRegisterStore(
    (state) => state.set_register_info
  );

  /* hook-form */
  const { register, watch, getValues } = useForm<IFormInputValues>({
    shouldUseNativeValidation: true,
    defaultValues: { nickname: register_nickname },
  });

  /* state */
  const [failed, setFailed] = useState(false);

  return (
    <>
      <Logo />
      <p>{t("name_var", { name: user_id })},</p>
      <p>
        {!failed && <Trans i18nKey={"register.nicknameAsking_message"} />}
        {failed && t("register.existingNickname_error")}
      </p>
      <FormInput
        placeholder={"nickname"}
        focusString={t("characterLimit_message", { min: 3, max: 16 })}
        {...register("nickname", {
          required: true,
          minLength: 3,
          maxLength: 16,
          onChange: (e) => setFailed(false),
        })}
      ></FormInput>
      <p></p>
      {(watch("nickname") || "").length >= nickname_limit.min && (
        <BlueLink
          onClick={(e) => {
            const { ok } = registerApi.register_nickname({
              id: user_id,
              nickname: getValues("nickname"),
            });
            if (ok) {
              set_register_info({ register_nickname: getValues("nickname") });
              set_user_info(authApi.get_user_info(user_id));
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

export default RegisterNickname;
