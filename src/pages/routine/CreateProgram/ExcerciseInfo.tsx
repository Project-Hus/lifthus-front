import { DeleteIcon, TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Flex, Button, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { exerciseDB } from "../../../api/mocks/routineApi.mock";

const ExerciseInfo = ({
  excercise,
  deleteExercise,
  isEditing,
}: {
  excercise: exerciseDB;
  deleteExercise: Function;
  isEditing: boolean;
}) => {
  let [reps, setReps] = useState<number>(3);

  return (
    <Box>
      <Flex justifyContent={"space-between"} alignItems="center">
        <Text>{excercise.name}</Text>
        <Text>{excercise.trainingType}</Text>

        {isEditing ? (
          <Button onClick={() => deleteExercise(excercise)}>
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
export default ExerciseInfo;
