import { PlusSquareIcon } from "@chakra-ui/icons";
import { Button, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { ThemeColor } from "../../common/styles/theme.style";
import useDateDiff from "../../hooks/date";

type RoutinePanelHeadProps = {
  date: Date;
};

const RoutinePanelHead = ({ date }: RoutinePanelHeadProps) => {
  const navigate = useNavigate();
  const dateStrList = date.toString().split(" ").splice(0, 4);
  return (
    <TodaysRoutineHeadDiv>
      <DateTitle date={date} />
      &nbsp;
      <Text fontSize={"1.25rem"} marginTop="auto" marginBottom="0.3rem">
        {dateStrList.join(" ")}
      </Text>
      <Button
        variant="ghost"
        marginLeft="auto"
        marginTop="auto"
        marginBottom="auto"
        fontSize="2rem"
        color="white"
        _hover={{
          bgColor: ThemeColor.backgroundColorDarker,
        }}
        onClick={() => {
          navigate("/routine/add");
        }}
      >
        <PlusSquareIcon />
      </Button>
    </TodaysRoutineHeadDiv>
  );
};

export default RoutinePanelHead;

const TodaysRoutineHeadDiv = styled.div`
  display: flex;
  padding: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const DateTitle = ({ date }: { date: Date }) => {
  const dateDiff = useDateDiff(date);
  let dateStr = `${Math.abs(dateDiff)}`;
  if (dateDiff > 0) dateStr += "일 후";
  else if (dateDiff < 0) dateStr += "일 전";
  else dateStr = "오늘";
  return (
    <Text fontWeight={"bold"} fontSize={"1.75rem"} marginBottom="0.2rem">
      {dateStr}의 루틴
    </Text>
  );
};
