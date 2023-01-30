import React from "react";
import RegisterNumber from "./components/RegisterNumber";

const RegisterBodyWeight = () => {
  return (
    <RegisterNumber
      take={"register_bodyweight"}
      content={
        <>
          평소 <strong>체중</strong>은 어떻게 되시나요?
        </>
      }
      unit={"kg"}
      min={0}
      max={300}
      next="/register/height"
    />
  );
};

export default RegisterBodyWeight;
