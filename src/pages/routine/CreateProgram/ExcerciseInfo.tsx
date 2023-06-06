import { DeleteIcon, TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Flex, Button, Input, Text, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import programApi from "../../../api/programApi";
import useNewWeeklyProgramStore, {
  WeeklyRoutineAct,
} from "../../../store/createWeeklyProgram.zustand";

const ActInfo = ({
  routineAct,
  isEditing,
}: {
  routineAct: WeeklyRoutineAct;
  isEditing: boolean;
}) => {
  const { newProgram, updateRoutineAct } = useNewWeeklyProgramStore();

  const { data: act, isLoading } = useQuery(
    ["act", { id: routineAct.act_id }],
    async () => {
      const act = await programApi.queryActById(routineAct.act_id);
      return act;
    }
  );

  if (act)
    return (
      <Box>
        <Flex
          justifyContent={"space-between"}
          alignItems="center"
          fontSize="3vw"
        >
          <Text>{act?.name}</Text>

          {isEditing && (
            <Button onClick={() => {}}>
              <DeleteIcon />
            </Button>
          )}

          {!isEditing && act.type == "rep" && (
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
                  defaultValue={routineAct.reps}
                  fontSize="3vw"
                ></Input>
              </Flex>
            </Flex>
          )}
          {!isEditing && act.type == "lap" && (
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
                  defaultValue={routineAct.lap}
                  readOnly
                  fontSize="3vw"
                ></Input>
                {"초"}
              </Flex>
            </Flex>
          )}
          {!isEditing && act.type == "simple" && <></>}
          {!isEditing && (
            <Flex direction={"column"}>
              <Button
                onClick={() => {
                  if (typeof routineAct.reps == "number")
                    updateRoutineAct(
                      routineAct.week,
                      routineAct.day,
                      routineAct.order,
                      { reps: routineAct.reps + 1 }
                    );
                }}
              >
                <TriangleUpIcon />
              </Button>
              <Button
                onClick={() => {
                  if (
                    typeof routineAct.reps == "number" &&
                    routineAct.reps >= 0
                  )
                    updateRoutineAct(
                      routineAct.week,
                      routineAct.day,
                      routineAct.order,
                      { reps: routineAct.reps - 11 }
                    );
                }}
              >
                <TriangleDownIcon />
              </Button>
            </Flex>
          )}
        </Flex>
      </Box>
    );
  else return <Spinner />;
};
export default ActInfo;
