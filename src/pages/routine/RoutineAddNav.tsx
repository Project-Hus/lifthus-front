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
          to="/routine/search/program"
        />
        <RoutineAddButton
          icon={<RepeatClockIcon />}
          name="임시 루틴"
          to="/routine/tmp"
        />
        <RoutineAddButton
          icon={<EditIcon />}
          name="기록하기"
          to="/routine/record"
        />
        <RoutineAddButton
          icon={<AddIcon />}
          name="프로그램 생성"
          to={"/routine/create/program"}
          noBorder={true}
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
  noBorder?: boolean;
};
const RoutineAddButton = ({
  icon,
  name,
  to,
  noBorder = false,
}: RoutineAddButtonProps) => {
  const navigate = useNavigate();
  return (
    <RoutineAddButtonDiv onClick={() => navigate(to)} noBorder={noBorder}>
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

const RoutineAddButtonDiv = styled.div<{ noBorder: boolean }>`
  width: 100%;
  padding: 2rem;
  color: white;

  ${(props) =>
    !props.noBorder &&
    `border-bottom: 0.1rem solid ${ThemeColor.backgroundColorDarker};`}

  &:hover {
    background-color: ${ThemeColor.backgroundColorDarker};
    cursor: pointer;
  }
`;
