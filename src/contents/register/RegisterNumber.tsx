import React, { Component, ReactComponentElement } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../../common/components/forms/FormInput";
import Logo from "../../common/components/Logo";
import useAppStore from "../../store/app.zustand";

const RegisterNumber = ({ content }: { content: any }) => {
  const { register } = useForm({ shouldUseNativeValidation: true });
  return (
    <>
      <Logo></Logo>
      <p>{content}</p>
      <div>
        <FormInput type="number" {...register("id", { min: 0, max: 200 })} />
      </div>
    </>
  );
};

export default RegisterNumber;
