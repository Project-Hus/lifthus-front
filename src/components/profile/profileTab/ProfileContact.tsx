import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Input,
  Spinner,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import { GetUserInfoDto, UpdateUserInfoDto } from "../../../api/dtos/user.dto";
import relationApi from "../../../api/relationApi";
import userApi from "../../../api/userApi";
import { ThemeColor } from "../../../common/styles/theme.style";
import useUserStore from "../../../store/user.zustand";

const ProfileContact = ({ user }: { user: GetUserInfoDto }) => {
  const queryClient = useQueryClient();

  const { setUserInfo, uid } = useUserStore();

  const [contactInfo, setContactInfo] = useState<UpdateUserInfoDto>({
    uid: user.uid,
    company: user.company,
    location: user.location,
    contact: user.contact,
  });

  const { register, getValues } = useForm<UpdateUserInfoDto>();

  const { mutate: updateContact, isLoading } = useMutation({
    mutationFn: (data: UpdateUserInfoDto) => {
      data.uid = user.uid;
      return userApi.setUserInfo(data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user", { uid: user.uid }]);
      setUserInfo(data);
      setContactInfo(data);
    },
  });

  const onSubmit = () => {
    updateContact(getValues());
  };

  // profile user's following list
  const { data: userFollowing } = useQuery({
    queryKey: ["following", { uid: user.uid }],
    queryFn: () => relationApi.getUserFollowing({ uid: user.uid }),
  });

  // profile user's follower list
  const { data: userFollowers, isLoading: followersLoading } = useQuery({
    queryKey: ["followers", { uid: user.uid }],
    queryFn: () => relationApi.getUserFollowers({ uid: user.uid }),
  });

  // follow mutation
  const { mutate: followUser } = useMutation({
    mutationFn: () => relationApi.followUser({ uid: user.uid }),
    onSuccess: () => {
      queryClient.invalidateQueries(["followers", { uid: user.uid }]);
    },
  });

  // unfollow mutation
  const { mutate: unfollowUser } = useMutation({
    mutationFn: () => relationApi.unfollowUser({ uid: user.uid }),
    onSuccess: () => {
      queryClient.invalidateQueries(["followers", { uid: user.uid }]);
    },
  });

  const { uid: clientUid } = useUserStore();

  return (
    <Card
      borderRadius={"1em"}
      bgColor={ThemeColor.backgroundColor}
      color={"white"}
    >
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Contact title="#ID" content={user.usercode} />
          <Contact
            {...register("company")}
            title="🏢 Company"
            content={contactInfo.company || ""}
            change={uid === user.uid}
            onSubmit={onSubmit}
          />
          <Contact
            {...register("location")}
            title="🗺️ Location"
            content={contactInfo.location || ""}
            change={uid === user.uid}
            onSubmit={onSubmit}
          />
          <Contact
            {...register("contact")}
            title="☏ Contact"
            content={contactInfo.contact || ""}
            change={uid === user.uid}
            onSubmit={onSubmit}
          />
          {!!clientUid &&
            clientUid !== uid &&
            (userFollowers?.includes(clientUid) ? (
              <Button variant="solid" onClick={() => unfollowUser()}>
                {followersLoading ? <Spinner /> : "Unfollow"}
              </Button>
            ) : (
              <Button variant="outline" onClick={() => followUser()}>
                {followersLoading ? <Spinner /> : "Follow"}
              </Button>
            ))}
        </Stack>

        {!!clientUid &&
          clientUid !== user.uid &&
          (userFollowers?.includes(clientUid) ? (
            <Button variant="solid" onClick={() => unfollowUser()}>
              {followersLoading ? <Spinner /> : "Unfollow"}
            </Button>
          ) : (
            <Button variant="outline" onClick={() => followUser()}>
              {followersLoading ? <Spinner /> : "Follow"}
            </Button>
          ))}
        {isLoading && <Spinner />}
      </CardBody>
    </Card>
  );
};

export default ProfileContact;

type ContactProps = {
  title: string;
  content: string;
  change?: boolean;
  onSubmit?: () => void;
};

const Contact = React.forwardRef<
  HTMLInputElement,
  ContactProps & Partial<ReturnType<UseFormRegister<UpdateUserInfoDto>>>
>(
  (
    { name, onChange, onBlur, onSubmit, title, content, change = false },
    ref
  ) => {
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
              onSubmit={(e) => {
                e.preventDefault();
                if (onSubmit) onSubmit();
                setIsEditing(false);
              }}
            >
              <Input
                name={name}
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
                defaultValue={content}
                textAlign="center"
              ></Input>
              <Button
                variant="solid"
                type="submit"
                bg={ThemeColor.backgroundColorDarker}
              >
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
  }
);
