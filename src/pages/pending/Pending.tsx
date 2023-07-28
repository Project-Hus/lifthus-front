import { Spinner } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import Logo from "../../common/components/Logo";

const Pending = () => {
  return (
    <PendingDiv>
      <Logo />
      <Spinner />
    </PendingDiv>
  );
};

const PendingDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;
`;

export default Pending;
