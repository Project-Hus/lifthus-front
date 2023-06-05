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
      <Flex direction={"row"} margin="0.3em">
        {result.images &&
          result.images?.map((srcs: string, idx: number) => {
            return <Img width="20%" height="20%" src={srcs} key={idx}></Img>;
          })}
        <div>
          {!isDetail && (
            <Flex>
              <Text fontSize="ms" paddingLeft="0.5em" fontWeight={"bold"}>
                {result.name}
              </Text>
              <Text fontSize="ms" paddingLeft="0.5em">
                {"by" + result.author}
              </Text>
            </Flex>
          )}
          <Text
            style={{ whiteSpace: "pre-wrap" }}
            size="sm"
            fontSize="sm"
            color="white"
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
              visibility={isDetail ? "visible" : "hidden"}
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
              visibility={isDetail ? "visible" : "hidden"}
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
        <Box float="right">
          <StarIcon />
          {result.starnum}
          <BellIcon />
          {result.likenum}
        </Box>
      )}
    </div>
  );
};
export default RoutineShort;
