import { DeleteIcon, TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Flex, Button, Input, Text, Img } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { useState } from "react";
import { ThemeColor } from "../../../common/styles/theme.style";
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

  const InputButtonStyle = css`
    background-color: ${ThemeColor.backgroundColorDarker};
    border: 1px solid ${ThemeColor.backgroundColor};
    border-radius: 5px;
    font-size: 3vw;
    width: 3em;
    text-align: center;
    padding: 0.5em 0;
    `
  return (
    <Box>
      <Flex justifyContent={"space-between"} alignItems="center" fontSize="3vw">
        <Img boxSize="10vw" borderRadius="5%" marginRight="2vw" src={"https://bit.ly/sage-adebayo"}></Img>
        <Text>{act.actDB.name}</Text>
        {isEditing && (
          <Button bg={ThemeColor.backgroundColor} onClick={() => deleteAct()} _hover={{ backgroundColor: ThemeColor.backgroundColorDarker }}>
            🗑️
          </Button>
        )}

        {!isEditing && act.actDB.type == "repeat" && (
          <Flex alignItems={"center"}>
            <Flex alignItems={"center"}>
              <Input
                css={InputButtonStyle}
                defaultValue={60}
              ></Input>{" "}
              {"%"}
            </Flex>
            &nbsp;
            <Flex alignItems={"center"}>
              {"X"}
              <Input
                css={InputButtonStyle}
                type="number"
                defaultValue={reps}
              ></Input>
            </Flex>
          </Flex>
        )}
        {!isEditing && act.actDB.type == "time" && (
          <Flex alignItems={"center"}>
            <Flex alignItems={"center"}>
              <Input
                type="number"
                css={InputButtonStyle}
                defaultValue={60}
              ></Input>{" "}
              {"분"}
            </Flex>
            &nbsp;
            <Flex alignItems={"center"}>
              <Input
                css={InputButtonStyle}

                type="number"
                defaultValue={reps}
                readOnly

              ></Input>
              {"초"}
            </Flex>
          </Flex>
        )}
        {!isEditing && act.actDB.type == "simple" && <></>}
        {!isEditing && (
          <Flex direction={"column"}>
            <Button onClick={() => setReps(++reps)} boxSize={"5vw"}>
              <TriangleUpIcon />
            </Button>
            <Button onClick={() => setReps(--reps)} boxSize={"5vw"}>
              <TriangleDownIcon />
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};
export default ActInfo;
