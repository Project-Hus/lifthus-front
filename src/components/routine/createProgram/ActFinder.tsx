import { AddIcon } from "@chakra-ui/icons";
import { Button, Input, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ThemeColor } from "../../../common/styles/theme.style";

const ActFinder = () => {
  const navigate = useNavigate();
  return (
    <ActFinderDiv>
      <div style={{ display: "flex" }}>
        <Button
          w="20%"
          variant="ghost"
          leftIcon={<AddIcon />}
          _hover={{ bgColor: ThemeColor.backgroundColorDarker }}
          onClick={() => {
            navigate("/routine/act/create");
          }}
        >
          새 동작 생성
        </Button>
        <Input
          w="60%"
          border="none"
          bgColor={ThemeColor.backgroundColorDarker}
          placeholder="동작 검색"
          fontSize="1.5rem"
        />
      </div>
    </ActFinderDiv>
  );
};
export default ActFinder;

const ActFinderDiv = styled.div`
  border-bottom: 0.1rem solid ${ThemeColor.backgroundColorDarker};
  padding-top: 1rem;
  padding-bottom: 1rem;
`;
