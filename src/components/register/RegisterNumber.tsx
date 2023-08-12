import { Image } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import FormInput from "../../common/components/forms/FormInput";
import BlueLink from "../../common/components/links/BlueLink";
import SubmitLink from "../../common/components/links/SubmitLink";
import Logo from "../../common/components/Logo";
import { RegisterInfoStrings } from "../../store/interfaces/register.interface";
import useRegisterStore from "../../store/register.zustand";

const RegisterNumber = ({
  take,
  content,
  pref,
  unit,
  next,
  min,
  max,
  img,
  alt,
}: {
  take: RegisterInfoStrings;
  content: any;
  pref?: any;
  unit: string;
  next: string;
  min: number;
  max: number;
  img?: string;
  alt?: string;
}) => {
  const { t, i18n } = useTranslation();
  /* store */
  const registerNumber = useRegisterStore((state) => state.registerNumber);
  const register_value = useRegisterStore((state) => state[take]);
  /* hook-form */
  const { register, getValues } = useForm({
    shouldUseNativeValidation: true,
    defaultValues: { value: register_value },
  });

  const navigate = useNavigate();

  const val = getValues("value");
  const isValid = val >= min && val <= max;

  return (
    <>
      <Logo></Logo>
      <div style={{ margin: "10%" }}>
        {img && <Image src={img} alt={alt} sx={{ width: "20vw" }} />}
      </div>
      <p>{content}</p>
      <form
        onSubmit={() => {
          navigate(next);
        }}
      >
        <div style={{ display: "flex" }}>
          <FormInput
            autoFocus={true}
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
                registerNumber(tmp);
              },
            })}
          />
        </div>
        {isValid && <SubmitLink>{t("Next")}</SubmitLink>}
      </form>
      <p></p>
    </>
  );
};

export default RegisterNumber;
