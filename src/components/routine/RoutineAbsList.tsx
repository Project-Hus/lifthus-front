import { Image, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { ThemeColor } from "../../common/styles/theme.style";

const RoutineAbsList = () => {
  return (
    <RoutineAbsListDiv>
      <RoutineAbs />
    </RoutineAbsListDiv>
  );
};
export default RoutineAbsList;

const RoutineAbsListDiv = styled.div``;

const RoutineAbs = () => {
  return (
    <RoutineAbsDiv>
      <Image
        src="https://media.tenor.com/t3buP-QoO9oAAAAM/jim-carrey-work.gif"
        alt="working on"
        w="5rem"
        margin="0.5rem"
      />
      <Text marginTop="auto" marginBottom="auto">
        준비중...
      </Text>
    </RoutineAbsDiv>
  );
};

const RoutineAbsDiv = styled.div`
  display: flex;

  background-color: ${ThemeColor.backgroundColorDarker};
`;
