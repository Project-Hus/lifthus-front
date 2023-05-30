import {
  Box,
  Card,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GetUserInfoDto, UpdateUserInfoDto } from "../../../api/dtos/user.dto";
import { ThemeColor } from "../../../common/styles/theme.style";

const ProfileContact = ({ user }: { user: GetUserInfoDto }) => {
  const propInfo: UpdateUserInfoDto = {
    uid: user.uid,
    company: user.company,
    location: user.location,
    contact: user.contact,
  };
  const [contactInfo, setContactInfo] = useState<UpdateUserInfoDto>(propInfo);

  const { register, handleSubmit, watch } = useForm<UpdateUserInfoDto>();
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
