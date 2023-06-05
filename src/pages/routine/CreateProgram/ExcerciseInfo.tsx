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
  };
  return (
    <Box>
      <Flex justifyContent={"space-between"} alignItems="center" fontSize="3vw">
        <Text>{act.actDB.name}</Text>

        {isEditing && (
          <Button onClick={() => deleteAct()}>
            <DeleteIcon />
          </Button>
        )}

        {!isEditing && act.actDB.type == "repeat" && (
          <Flex alignItems={"center"}>
            <Flex alignItems={"center"}>
              <Input
                type="number"
                width="5em"
                textAlign="center"
                defaultValue={60}
                fontSize="3vw"
              ></Input>{" "}
              {"%"}
            </Flex>
            &nbsp;
            <Flex alignItems={"center"}>
              {"X"}
              <Input
                width="5em"
                type="number"
                defaultValue={reps}
                fontSize="3vw"
              ></Input>
            </Flex>
          </Flex>
        )}
        {!isEditing && act.actDB.type == "time" && (
          <Flex alignItems={"center"}>
            <Flex alignItems={"center"}>
              <Input
                type="number"
                width="5em"
                textAlign="center"
                defaultValue={60}
                fontSize="3vw"
              ></Input>{" "}
              {"분"}
            </Flex>
            &nbsp;
            <Flex alignItems={"center"}>
              <Input
                width="5em"
                type="number"
                defaultValue={reps}
                readOnly
                fontSize="3vw"
              ></Input>
              {"초"}
            </Flex>
          </Flex>
        )}
        {!isEditing && act.actDB.type == "simple" && <></>}
        {!isEditing && (
          <Flex direction={"column"}>
            <Button onClick={() => setReps(++reps)}>
              <TriangleUpIcon />
            </Button>
            <Button onClick={() => setReps(--reps)}>
              <TriangleDownIcon />
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};
export default ActInfo;
