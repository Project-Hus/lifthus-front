import styled from "@emotion/styled";
import { t } from "i18next";
import React from "react";
import { useSearchParams } from "react-router-dom";

import Logo from "../../common/components/Logo";

const ErrorPage = () => {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const message = searchParams.get("message");
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
