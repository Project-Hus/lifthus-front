import { DeleteIcon, TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Flex, Button, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { act } from "../../../store/interfaces/program.interface";
import useProgramPlanStore from "../../../store/program.zustand";

const ActInfo = ({ act, isEditing }: { act: act; isEditing: boolean }) => {
  let [reps, setReps] = useState<number>(3);
  const { setProgramPlanInfo, program } = useProgramPlanStore();

  const deleteAct = () => {
    const delAct = act;
    const newacts = program.acts.filter((act) => delAct !== act);
    setProgramPlanInfo({ acts: newacts });
    console.log(program);
  };

  return (
    <Box>
      <Flex justifyContent={"space-between"} alignItems="center">
        <Text>{act.actDB.name}</Text>
        <Text>{act.actDB.type}</Text>

        {isEditing ? (
          <Button onClick={() => deleteAct()}>
            <DeleteIcon />
          </Button>
        ) : (
          <Flex alignItems={"center"}>
            <Input type="number" defaultValue={60}></Input> {"%"}
            {"X"}
            <Input type="number" value={reps} readOnly></Input>
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
