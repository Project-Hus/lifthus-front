import { DeleteIcon, TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Flex, Button, Input, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { WeeklyRoutineAct } from "../../../store/createWeeklyProgram.zustand";
import useProgramPlanStore from "../../../store/program.zustand";

const ActInfo = ({ routineAct, isEditing }: { routineAct: WeeklyRoutineAct; isEditing: boolean }) => {

  const { data:ra, isLoading } = useQuery(["act", { id: routineAct.act_id }], () => {

  });

  return (
    <Box>
      <Flex justifyContent={"space-between"} alignItems="center" fontSize="3vw">
        <Text>{routineAct.}</Text>

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
