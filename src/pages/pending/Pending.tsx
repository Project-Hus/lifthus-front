import styled from "@emotion/styled";
import React from "react";
import Logo from "../../common/components/Logo";
import BlueSpinner from "../../common/components/spinners/BlueSpinner";

const Pending = () => {
  return (
    <PendingDiv>
      <Logo />
      <BlueSpinner />
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
