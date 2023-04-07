import { Avatar } from "@chakra-ui/avatar";
import { Button, ButtonSpinner } from "@chakra-ui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/card";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import React from "react";
import {
  ChatIcon,
  ChevronDownIcon,
  CopyIcon,
  DeleteIcon,
  EditIcon,
  StarIcon,
} from "@chakra-ui/icons";
import { USER_PROFILE_IMAGE_ROUTE } from "../../../../common/routes";
import useUserStore from "../../../../store/user.zustand";
import { ThemeColor } from "../../../../common/styles/theme.style";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { RepContent } from "../../../../api/interfaces/repsApi.interface";
import CommentList from "./commentList";
import { useDisclosure } from "@chakra-ui/hooks";
import { useState } from "react";
import { CommentContent } from "../../../../api/interfaces/commentApi.interface";
import { useQuery } from "@tanstack/react-query";
import commentApi from "../../../../api/commentApi";
import CommentCreate from "./commentCreate";

const Rep = ({ rep }: { rep: RepContent }) => {
  //open/close comment window functions
  const { getDisclosureProps, getButtonProps } = useDisclosure();
  const buttonProps = getButtonProps()
  const disclosureProps = getDisclosureProps()

  //call comment data from api(임시)
  const [comments, setComments] = useState<CommentContent[]>([]);
  const comment_id_obj = useQuery({
    queryKey: ["comment_obj", rep.rep_id],
    queryFn: () =>
      commentApi.get_rep_comments(rep.rep_id),
    onSuccess: (data) => {
      setComments(data);
    }

  }

  );



  const image_list = [];
  for (const i in rep.image_srcs) {
    image_list.push(
      <Image
        objectFit="contain"
        src={rep.image_srcs[Number(i)]}
        alt={`${i}th image of ${rep.username}'s rep`}
        maxH={"50vh"}
      />
    );
  }
  return (
    <>
      <Card
        bgColor={ThemeColor.backgroundColorDarker}
        color="white"
        fontSize="0.7em"
        margin="0.5em"
        marginBottom={"0em"}
      >
        <CardHeader>
          <Flex letterSpacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar
                name={rep.username}
                src={USER_PROFILE_IMAGE_ROUTE + rep.username + ".jpeg"}
              />
              <Box>
                <Heading fontSize="1.1em">{rep.username}</Heading>
                <Text fontSize={"0.9em"} color="gray.400">
                  {`${rep.updated_at}`.slice(0, 21)}
                </Text>
              </Box>
            </Flex>
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    variant="unstyled"
                    isActive={isOpen}
                    as={Button}
                    color={ThemeColor.basicColor}
                    rightIcon={<ChevronDownIcon fontSize="2.2em" />}
                  />
                  <MenuList
                    fontSize={"1em"}
                    bgColor={ThemeColor.backgroundColorDarker}
                  >
                    <MenuItem
                      bgColor={ThemeColor.backgroundColorDarker}
                      _hover={{
                        bgColor: ThemeColor.backgroundColor,
                        color: "white",
                      }}
                    >
                      <CopyIcon />
                      &nbsp;Copy URL
                    </MenuItem>
                    <MenuItem
                      bgColor={ThemeColor.backgroundColorDarker}
                      color="yellow.400"
                      _hover={{ bgColor: "yellow.500", color: "white" }}
                    >
                      <EditIcon />
                      &nbsp;Edit
                    </MenuItem>
                    <MenuItem
                      bgColor={ThemeColor.backgroundColorDarker}
                      color="red.400"
                      onClick={() => alert("Kagebunshin")}
                      _hover={{ bgColor: "red.500", color: "white" }}
                    >
                      <DeleteIcon />
                      &nbsp;Delete
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
          </Flex>
        </CardHeader>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: ThemeColor.backgroundColor,
            borderLeft: `solid 0.5em ${ThemeColor.backgroundColorDarker}`,
            borderRight: `solid 0.5em ${ThemeColor.backgroundColorDarker}`,
          }}
        >
          {image_list}
        </div>
        <CardBody>
          <Text>{rep.text}</Text>
        </CardBody>
        <CardFooter justify="space-between">
          <Button
            flex="1"
            variant="ghost"
            leftIcon={<StarIcon />}
            _hover={{ bg: ThemeColor.backgroundColor }}
          >
            Like
          </Button>
          <Button
            {...buttonProps}
            flex="1"
            variant="ghost"
            leftIcon={<ChatIcon />}
            _hover={{ bg: ThemeColor.backgroundColor }}
          >
            Comment
          </Button>



        </CardFooter>
        <Card {...disclosureProps}>

          <CommentCreate rep_id={rep.rep_id} />
          <CommentList data={comments} />
        </Card>
      </Card>
    </>
  );
};

export default Rep;
