import React from "react";
import RegisterNumber from "./components/RegisterNumber";

const RegisterHeight = () => {
  return (
    <RegisterNumber
      take={"register_height"}
      content={
        <>
          <strong>신장</strong>은 어떻게 되세요?
        </>
      }
      unit={"cm"}
      min={0}
      max={300}
      next="/register/squat"
    />
  );
};

export default RegisterHeight;
