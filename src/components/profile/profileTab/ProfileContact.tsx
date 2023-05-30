import {
  Box,
  Card,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { GetUserInfoDto } from "../../../api/dtos/user.dto";
import { ThemeColor } from "../../../common/styles/theme.style";

const ProfileContact = ({ user }: { user: GetUserInfoDto }) => {
  return (
    <Card
      borderRadius={"1em"}
      bgColor={ThemeColor.backgroundColor}
      color={"white"}
    >
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              #ID
            </Heading>
            <Text pt="2" fontSize="sm">
              {user.usercode}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              🏢 Company
            </Heading>
            <Text pt="2" fontSize="sm">
              {user.company}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              🗺️ Location
            </Heading>
            <Text pt="2" fontSize="sm">
              {user.location}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              ☏ Contact
            </Heading>
            <Text pt="2" fontSize="sm">
              {user.contact}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProfileContact;
