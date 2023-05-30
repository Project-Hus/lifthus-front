import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Input,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GetUserInfoDto, UpdateUserInfoDto } from "../../../api/dtos/user.dto";
import userApi from "../../../api/userApi";
import { ThemeColor } from "../../../common/styles/theme.style";

const ProfileContact = ({ user }: { user: GetUserInfoDto }) => {
  const queryClient = useQueryClient();

  const propInfo: UpdateUserInfoDto = {
    uid: user.uid,
    company: user.company,
    location: user.location,
    contact: user.contact,
  };
  const [contactInfo, setContactInfo] = useState<UpdateUserInfoDto>(propInfo);

  const { register, handleSubmit, watch } = useForm<UpdateUserInfoDto>();

  const { mutate: updateContact, data } = useMutation({
    mutationFn: (data: UpdateUserInfoDto) => userApi.setUserinfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["user", { uid: user.uid }]);
    },
  });
  return (
    <Card
      borderRadius={"1em"}
      bgColor={ThemeColor.backgroundColor}
      color={"white"}
    >
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Contact title="#ID" content={user.usercode} />
          <Contact title="🏢 Company" content={user.company} change={true} />
          <Contact title="🗺️ Location" content={user.location} change={true} />
          <Contact title="☏ Contact" content={user.contact} change={true} />
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProfileContact;

const Contact = ({
  title,
  content,
  change = false,
}: {
  title: string;
  content: string;
  change?: boolean;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Box
      _hover={
        change && !isEditing
          ? {
              bgColor: ThemeColor.backgroundColorDarker,
              cursor: "pointer",
            }
          : {}
      }
      onClick={() => {
        if (change) setIsEditing(true);
      }}
    >
      <Heading size="xs" textTransform="uppercase">
        {title}
      </Heading>
      {change && isEditing ? (
        <>
          <form
            onSubmit={() => {
              setIsEditing(false);
            }}
          >
            <Input defaultValue={content} textAlign="center"></Input>
            <Button variant="solid" type="submit">
              <CheckIcon />
            </Button>
          </form>
        </>
      ) : (
        <Text pt="2" fontSize="sm">
          {content}
        </Text>
      )}
    </Box>
  );
};
