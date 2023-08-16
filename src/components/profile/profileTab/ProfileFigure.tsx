import {
  FormLabel,
  Stack,
  StackItem,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import { ThemeColor } from "../../../common/styles/theme.style";

const ProfileFigure = () => {
  return (
    <Stack>
      <StackItem>
        <FormLabel textAlign={"center"} fontSize="1em" fontWeight={"bold"}>
          BIG 3
        </FormLabel>
        <StatGroup
          border={`ridge 0.1em ${ThemeColor.backgroundColor}`}
          borderRadius="1em"
          padding="0.5em"
        >
          <Stat>
            <StatLabel>Squat</StatLabel>
            <StatNumber>
              {160}
              <Text display={"inline"} fontSize="0.5em">
                kg
              </Text>
            </StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>Benchpress</StatLabel>
            <StatNumber>
              {120}
              <Text display={"inline"} fontSize="0.5em">
                kg
              </Text>
            </StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              9.05%
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Deadlift</StatLabel>
            <StatNumber>
              {180}
              <Text display={"inline"} fontSize="0.5em">
                kg
              </Text>
            </StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              9.05%
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>
              <Text>Total</Text>
            </StatLabel>
            <StatNumber>
              {460}
              <Text display={"inline"} fontSize="0.5em">
                kg
              </Text>
            </StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              9.05%
            </StatHelpText>
          </Stat>
        </StatGroup>
        <FormLabel textAlign={"center"} fontSize="1em" fontWeight={"bold"}>
          Body
        </FormLabel>
        <StatGroup
          border={`ridge 0.1em ${ThemeColor.backgroundColor}`}
          borderRadius="1em"
          padding="0.5em"
        >
          <Stat>
            <StatLabel>Height</StatLabel>
            <StatNumber>
              {183}
              <Text display={"inline"} fontSize="0.5em">
                cm
              </Text>
            </StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              9.05%
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Weight</StatLabel>
            <StatNumber>
              {105}
              <Text display={"inline"} fontSize="0.5em">
                kg
              </Text>
            </StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              9.05%
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>
              <Text>Fat Percentage</Text>
            </StatLabel>
            <StatNumber>
              {18}
              <Text display={"inline"} fontSize="0.5em">
                %
              </Text>
            </StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              9.05%
            </StatHelpText>
          </Stat>
        </StatGroup>
      </StackItem>
      <StackItem>
        <Text fontSize={"sm"}>
          This feature will come with routine service!
        </Text>
      </StackItem>
    </Stack>
  );
};

export default ProfileFigure;
