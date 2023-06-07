import { StarIcon, BellIcon } from "@chakra-ui/icons";
import { Card, Flex, Img, Text, Box, Button } from "@chakra-ui/react";
import { routineFoldStandard } from "../../common/constraints";
import { programDB } from "../../store/interfaces/program.interface";
import { ThemeColor } from "../../common/styles/theme.style";
import { Key, useState } from "react";
import { QueryProgramDto } from "../../api/dtos/program/program.dto";
import { useQuery } from "@tanstack/react-query";
import userApi from "../../api/userApi";
//make component for routine short
const RoutineShort = ({
  result,
  isDetail,
}: {
  result: QueryProgramDto;
  isDetail: boolean;
}) => {
  //설명 접기 기능을 위한 state
  const [IsFold, setFold] = useState(true);

  const { data: author } = useQuery(["user", { uid: result.author }], () => {
    return userApi.getUserInfo({ uid: result.author });
  });

  return (
    <div>
      <Flex margin="0.3em">
        <Img
          borderRadius="5%"
          boxSize={isDetail ? "5em" : "4rem"}
          src={
            "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
          }
        ></Img>
        <div>
          {!isDetail && (
            <Flex alignItems={"center"}>
              <Text fontSize="1em" paddingLeft="0.5rem" fontWeight={"bold"}>
                {result.title}
              </Text>
              <Text fontSize="0.5em" paddingLeft="0.5rem">
                {"by"}
              </Text>
              <Text fontSize="0.6em" paddingLeft="0.1rem" fontWeight="bold">
                {author?.username}
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
            {IsFold &&
            result.description &&
            result.description.length > routineFoldStandard.Length
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
        <Box float="right" fontSize="1rem" marginRight="1em">
          👍... 📌...
        </Box>
      )}
    </div>
  );
};
export default RoutineShort;
