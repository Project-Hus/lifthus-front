import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
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
import {
  FormLabel,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

const Rep = () => {
  const user_info = useUserStore((state) => state);
  return (
    <Card
      bgColor={ThemeColor.backgroundColorDarker}
      color="white"
      fontSize="0.7em"
      margin="1em"
    >
      <CardHeader>
        <Flex letterSpacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar
              name={user_info.username}
              src={USER_PROFILE_IMAGE_ROUTE + user_info.username + ".jpeg"}
            />
            <Box>
              <Heading fontSize="1.1em">{user_info.username}</Heading>
              <Text fontSize={"0.9em"} color="gray.400">
                {`${new Date("2022-02-03")}`.slice(0, 21)}
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
      <Image
        objectFit="cover"
        src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Chakra UI"
      />
      <CardBody>
        <Text>
          With Chakra UI, I wanted to sync the speed of development with the
          speed of design. I wanted the developer to be just as excited as the
          designer to create a screen.
        </Text>
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
          flex="1"
          variant="ghost"
          leftIcon={<ChatIcon />}
          _hover={{ bg: ThemeColor.backgroundColor }}
        >
          Comment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Rep;
