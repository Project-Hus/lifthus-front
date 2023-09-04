import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import Logo from "../../common/components/Logo";
import BlueSpinner from "../../common/components/spinners/BlueSpinner";

const Pending = () => {
  return (
    <PendingDiv>
      <Logo />
      <BlueSpinner />
      <Text textAlign={"center"}>
        화면 한번 띄우는데 람다 실행환경과
        <br />
        DB 커넥션 수십개가 생성되는 효율 문제로
        <br /> 쿼리 최적화 진행 중
      </Text>
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
