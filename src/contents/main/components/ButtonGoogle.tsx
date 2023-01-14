import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BtnGoogle = styled.button`
  position: relative;
  height: 10vh;
  font-size: 1.5rem;
  font-weight: bold;
  border: none;
  border-radius: 0.4rem 0.4rem 0.4rem 0.4rem;
  transition: 0.2s;
  background-size: contain;
  background-repeat: no-repeat;

  background-color: #2d47b9;
  color: rgb(219, 235, 255);

  box-shadow: 0 0 0.3rem 0.3rem;
  &:hover {
    background-color: #435bc7;
    box-shadow: 0 0 0.3rem 0.3rem #8094ee;
  }
`;

const ButtonGoogle = ({ to = "/" }: { to?: string }) => {
  const { t, i18n } = useTranslation();
  return (
    <Link to={to}>
      <BtnGoogle>{t("Google Login")}</BtnGoogle>
    </Link>
  );
};

export default ButtonGoogle;
