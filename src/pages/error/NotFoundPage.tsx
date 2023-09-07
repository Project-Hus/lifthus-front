import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { t } from "i18next";
import React from "react";
import { useSearchParams } from "react-router-dom";
import FlexCenterLayout from "../../common/components/layouts/FlexCenterLayout";

import Logo from "../../common/components/Logo";

const NotFoundPage = () => {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const message = searchParams.get("message");
  return (
    <ErrorDiv>
      <FlexCenterLayout>
        <Text fontWeight={"bold"} fontSize={"2em"}>
          404 <br />
          😮 Not found 😭
        </Text>
      </FlexCenterLayout>
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

export default NotFoundPage;
