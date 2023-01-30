import React from "react";
import RegisterNumber from "./components/RegisterNumber";

const RegisterDeadlift = () => {
  return (
    <RegisterNumber
      take={"register_deadlift"}
      content={
        <>
          <strong>데드리프트</strong> 최대 중량은요?
        </>
      }
      unit={"kg"}
      min={0}
      max={500}
      next="/register/confirm"
    />
  );
};

export default RegisterDeadlift;
