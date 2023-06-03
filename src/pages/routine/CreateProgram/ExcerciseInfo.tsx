import { DeleteIcon, TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Flex, Button, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { actDB } from "../../../store/interfaces/program.interface";
import useProgramPlanStore from "../../../store/program.zustand";

const ActInfo = ({ act, isEditing }: { act: actDB; isEditing: boolean }) => {
  let [reps, setReps] = useState<number>(3);
  const { setProgramPlanInfo } = useProgramPlanStore();
  return (
    <Box>
      <Flex justifyContent={"space-between"} alignItems="center">
        <Text>{act.name}</Text>
        <Text>{act.type}</Text>

        {isEditing ? (
          <Button onClick={() => setProgramPlanInfo({})}>
            <DeleteIcon />
          </Button>
        ) : (
          <Flex alignItems={"center"}>
            <Input type="number" defaultValue={60}></Input> {"%"}
            {"X"}
            <Input type="number" defaultValue={3} value={reps} readOnly></Input>
            <Flex direction={"column"}>
              <Button onClick={() => setReps(++reps)}>
                <TriangleUpIcon />
              </Button>
              <Button onClick={() => setReps(--reps)}>
                <TriangleDownIcon />
              </Button>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};
export default ActInfo;
