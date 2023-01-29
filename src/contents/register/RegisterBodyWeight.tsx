import React from "react";
import Logo from "../../common/components/Logo";
import useAppStore from "../../store/app.zustand";

const RegisterBodyWeight = () => {
  const nickname = useAppStore((state) => state.nickname);

  return (
    <>
      <Logo></Logo>
      <p>
        안녕하세요, {nickname} <b>리프터</b>님!
      </p>
      <p>평소 체중은 어떻게 되시나요?</p>
    </>
  );
};

export default RegisterBodyWeight;
