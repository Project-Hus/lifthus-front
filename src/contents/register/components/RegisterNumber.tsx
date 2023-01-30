import React, {
  ChangeEventHandler,
  Component,
  ReactComponentElement,
} from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { isSwitchStatement } from "typescript";
import FormInput from "../../../common/components/forms/FormInput";
import BlueLink from "../../../common/components/links/BlueLink";
import Logo from "../../../common/components/Logo";
import useAppStore from "../../../store/app.zustand";
import useRegisterStore from "../../../store/register.zustand";

const RegisterNumber = ({
  take,
  content,
  unit,
  next,
  min,
  max,
}: {
  take: "register_bodyweight" | "register_height";
  content: any;
  unit: string;
  next: string;
  min?: number;
  max?: number;
}) => {
  const { t, i18n } = useTranslation();
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
      <div style={{ display: "flex" }}>
        <FormInput
          type="number"
          unit={unit}
          bold={true}
          {...register("value", {
            min: min,
            max: max,
            onChange: (e) => {
              const tmp: any = {};
              tmp[take] = getValues("value");
              set_register_info(tmp);
            },
          })}
        />
      </div>
      <p>
        <BlueLink to={next}>{t("Next")}</BlueLink>{" "}
      </p>
    </>
  );
};

export default RegisterNumber;
