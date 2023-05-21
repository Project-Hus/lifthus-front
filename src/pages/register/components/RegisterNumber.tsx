import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormInput from "../../../common/components/forms/FormInput";
import BlueLink from "../../../common/components/links/BlueLink";
import Logo from "../../../common/components/Logo";
import { RegisterInfoStrings } from "../../../store/interfaces/register.interface";
import useRegisterStore from "../../../store/register.zustand";

const RegisterNumber = ({
  take,
  content,
  pref,
  unit,
  next,
  min,
  max,
}: {
  take: RegisterInfoStrings;
  content: any;
  pref?: any;
  unit: string;
  next: string;
  min?: number;
  max?: number;
}) => {
  const { t, i18n } = useTranslation();
  /* store */
  const set_register_info = useRegisterStore((state) => state.setRegisterInfo);
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
          pref={pref}
          unit={unit}
          bold={true}
          {...register("value", {
            min: min,
            max: max,
            onChange: (e) => {
              const tmp: any = {};
              tmp[take] = Number(getValues("value"));
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
