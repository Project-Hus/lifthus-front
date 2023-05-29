import styled from "@emotion/styled";
import { t } from "i18next";
import React from "react";

import Logo from "../common/components/Logo";

const ErrorPage = () => {
  return (
    <ErrorDiv>
      <Logo />
      <div>{t("error_page")}</div>
    </ErrorDiv>
  );
};

const ErrorDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;
`;

export default ErrorPage;
