import React from "react";
import RegisterNumber from "./components/RegisterNumber";

const RegisterBenchpress = () => {
  return (
    <RegisterNumber
      take={"register_benchpress"}
      content={
        <>
          <strong>벤치프레스</strong> 최대 중량은 어떻게 되세요?
        </>
      }
      unit={"kg"}
      min={0}
      max={500}
      next="/register/deadlift"
    />
  );
};

export default RegisterBenchpress;
