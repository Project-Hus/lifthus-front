import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../common/components/Logo";
import useAppStore from "../../store/app.zustand";

const RegisterWelcome = () => {
  const nickname = useAppStore((state) => state.nickname);
  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/register/bodyweight");
  }, 1000);
  return (
    <>
      <Logo></Logo>
      <p>
        안녕하세요, {nickname} <b>리프터</b>님!
      </p>
    </>
  );
};

export default RegisterWelcome;
