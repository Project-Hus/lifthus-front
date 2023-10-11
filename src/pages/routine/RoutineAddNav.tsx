import {
  AddIcon,
  EditIcon,
  RepeatClockIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { Button, Divider, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";

import React from "react";
import { useNavigate } from "react-router-dom";
import BasicPageLayout from "../../common/components/layouts/BasicPageLayout";
import { ThemeColor } from "../../common/styles/theme.style";
import { RoutinePanel } from "./Routine";

const RoutineAddNav = () => {
  return (
    <BasicPageLayout>
      <RoutinePanel>
        <RoutineAddButton
          icon={<SearchIcon />}
          name={"프로그램 검색"}
          to="program/search"
        />
        <RoutineAddButton
          icon={<RepeatClockIcon />}
          name="임시 루틴"
          to="tmp"
        />
        <RoutineAddButton icon={<EditIcon />} name="기록하기" to="record" />
        <RoutineAddButton
          icon={<AddIcon />}
          name="프로그램 생성"
          to="program/create"
        />
      </RoutinePanel>
      <div style={{ width: "100%", textAlign: "right" }}>
        <Button
          variant="ghost"
          color={ThemeColor.linkColor}
          fontSize="1.5rem"
          marginTop="2rem"
          padding="2rem"
          _hover={{ bgColor: ThemeColor.backgroundColorDarker }}
          onClick={() => {
            window.history.back();
          }}
        >
          뒤로 가기
        </Button>
      </div>
    </BasicPageLayout>
  );
};
export default RoutineAddNav;

type RoutineAddButtonProps = {
  icon: React.ReactNode;
  name: string;
  to: string;
};
const RoutineAddButton = ({ icon, name, to }: RoutineAddButtonProps) => {
  const navigate = useNavigate();
  return (
    <RoutineAddButtonDiv onClick={() => navigate(to)}>
      <div style={{ width: "100%", textAlign: "center" }}>{icon}</div>
      <Text
        fontWeight={"bold"}
        fontSize="2rem"
        width="100%"
        textAlign={"center"}
      >
        {name}
      </Text>
    </RoutineAddButtonDiv>
  );
};

const RoutineAddButtonDiv = styled.div`
  width: 100%;
  padding: 2rem;
  color: white;

  border-bottom: 0.1rem solid ${ThemeColor.backgroundColorDarker};

  &:hover {
    background-color: ${ThemeColor.backgroundColorDarker};
    cursor: pointer;
  }
`;
