import React from "react";
import { useForm } from "react-hook-form";

import FormInput, {
  IFormInputValues,
} from "../../common/components/forms/FormInput";
import BlueLink from "../../common/components/links/BlueLink";
import Logo from "../../common/components/Logo";
import { nickname_limit } from "../../common/constraints";

import useAppStore from "../../store/app.zustand";

const RegisterNickname = () => {
  /* store */
  const user_id = useAppStore((state) => state.user_id);
  /* hook-form */
  const { register, watch } = useForm<IFormInputValues>({
    shouldUseNativeValidation: true,
  });
  return (
    <>
      <Logo />
      <p>안녕하세요, {user_id}님!</p>
      <p>어떤 닉네임을 사용하시겠어요?</p>
      <FormInput
        placeholder={"nickname"}
        focusString={"3~16자"}
        {...register("nickname", {
          required: true,
          minLength: 3,
          maxLength: 16,
        })}
      ></FormInput>
      <p></p>
      {(watch("nickname") || "").length >= nickname_limit.min && (
        <BlueLink to="/register/type">다음으로</BlueLink>
      )}
    </>
  );
};

export default RegisterNickname;
