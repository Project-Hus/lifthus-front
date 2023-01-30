import React, {
  ChangeEventHandler,
  Component,
  ReactComponentElement,
} from "react";
import { useForm } from "react-hook-form";
import { isSwitchStatement } from "typescript";
import FormInput from "../../common/components/forms/FormInput";
import Logo from "../../common/components/Logo";
import useAppStore from "../../store/app.zustand";
import useRegisterStore from "../../store/register.zustand";

const RegisterNumber = ({
  take,
  content,
  next,
}: {
  take: "register_bodyweight" | "register_height";
  content: any;
  next: string;
}) => {
  /* store */
  const set_register_info = useRegisterStore(
    (state) => state.set_register_info
  );
  const register_value = useRegisterStore((state) => state[take]);
  /* hook-form */
  const { register, getValues } = useForm({
    shouldUseNativeValidation: true,
    defaultValues: { value: register_value },
  });
  return (
    <>
      <Logo></Logo>
      <p>{content}</p>
      <div>
        <FormInput
          type="number"
          {...register("value", {
            min: 0,
            max: 200,
            onChange: (e) => {
              const tmp: any = {};
              tmp[take] = getValues("value");
              set_register_info(tmp);
            },
          })}
        />
      </div>
    </>
  );
};

export default RegisterNumber;
