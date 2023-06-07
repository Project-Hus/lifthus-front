import { StarIcon, BellIcon } from "@chakra-ui/icons";
import { Card, Flex, Img, Text, Box, Button } from "@chakra-ui/react";
import { routineFoldStandard } from "../../common/constraints";
import { programDB } from "../../store/interfaces/program.interface";
import { ThemeColor } from "../../common/styles/theme.style";
import { Key, useState } from "react";
//make component for routine short
const RoutineShort = ({
  result,
  isDetail,
}: {
  result: programDB;
  isDetail: boolean;
}) => {
  //설명 접기 기능을 위한 state
  const [IsFold, setFold] = useState(true);

  return (
    <div>
      <Flex margin="0.3em">
        {result.images &&
          result.images?.map((srcs: string, idx: number) => {
            return (
              <Img
                borderRadius="5%"
                boxSize={isDetail ? "5em" : "4rem"}
                src={srcs}
                key={idx}
              ></Img>
            );
          })}
        <div>
          {!isDetail && (
            <Flex alignItems={"center"}>
              <Text fontSize="1.5rem" paddingLeft="0.5rem" fontWeight={"bold"}>
                {result.name}
              </Text>
              <Text fontSize="0.3rem" paddingLeft="0.5rem">
                {"by"}
              </Text>
              <Text fontSize="0.7rem" paddingLeft="0.1rem" fontWeight="bold">
                {result.author}
              </Text>
            </Flex>
          )}
          <Text
            style={{ whiteSpace: "pre-wrap" }}
            size="sm"
            fontSize="0.5em"
            color="white"
            paddingLeft="0.5rem"
          >
            {IsFold && result.description.length > routineFoldStandard.Length
              ? result.description.slice(0, routineFoldStandard.Length) + "..."
              : result.description}
          </Text>

          {IsFold ? (
            <Button
              bg={ThemeColor.backgroundColor}
              _hover={{
                backgroundColor: ThemeColor.backgroundColor,
                textDecoration: "underline",
              }}
              display={isDetail ? "inline-block" : "none"}
              alignSelf="flex-start"
              onClick={() => setFold(false)}
              size="sm"
            >
              more...
            </Button>
          ) : (
            <Button
              _hover={{
                backgroundColor: ThemeColor.backgroundColor,
                textDecoration: "underline",
              }}
              display={isDetail ? "inline-block" : "none"}
              bg={ThemeColor.backgroundColor}
              alignSelf="flex-start"
              onClick={() => setFold(true)}
              size="sm"
            >
              {" "}
              shortly...
            </Button>
          )}
        </div>
      </Flex>

      {!isDetail && (
        <Box float="right" fontSize="1rem" marginRight="1em" marginBottom={"1em"}>
          👍
          {result.starnum}
          📌
          {result.likenum}
        </Box>
      )}
    </div>
  );
};
export default RoutineShort;
