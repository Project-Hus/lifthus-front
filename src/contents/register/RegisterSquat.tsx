import React from "react";
import RegisterNumber from "./components/RegisterNumber";

const RegisterSquat = () => {
  return (
    <RegisterNumber
      take={"register_squat"}
      content={
        <>
          <strong>스쿼트</strong> 최대 중량은 어떻게 되시나요?
        </>
      }
      unit={"kg"}
      min={0}
      max={500}
      next="/register/benchpress"
    />
  );
};

export default RegisterSquat;
