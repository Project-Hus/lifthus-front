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
import React, { useEffect, useState } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import { GetUserInfoDto, UpdateUserInfoDto } from "../../../api/dtos/user.dto";
import relationApi from "../../../api/relationApi";
import userApi from "../../../api/userApi";
import { ThemeColor } from "../../../common/styles/theme.style";
import useUserStore from "../../../store/user.zustand";

const ProfileContact = ({
  userInfo,
}: {
  userInfo: GetUserInfoDto | undefined;
}) => {
  const queryClient = useQueryClient();

  const profileUid = userInfo?.uid;

  const { setUserInfo, uid } = useUserStore();

  const [contactInfo, setContactInfo] = useState<UpdateUserInfoDto | undefined>(
    !profileUid
      ? undefined
      : {
          uid: profileUid,
          company: userInfo?.company,
          location: userInfo?.location,
          contact: userInfo?.contact,
        }
  );

  useEffect(() => {
    setContactInfo(
      !profileUid
        ? undefined
        : {
            uid: profileUid,
            company: userInfo?.company,
            location: userInfo?.location,
            contact: userInfo?.contact,
          }
    );
  }, [profileUid]);

  const { register, getValues } = useForm<UpdateUserInfoDto>();

  const { mutate: updateContact, isLoading } = useMutation({
    mutationFn: (data: UpdateUserInfoDto) => {
      if (!profileUid) return Promise.reject(new Error("undefined"));
      data.uid = profileUid;
      return userApi.setUserInfo(data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user", { uid: profileUid }]);
      setUserInfo(data);
      setContactInfo(data);
    },
  });

  const onSubmit = () => {
    updateContact(getValues());
  };

  // profile user's follower list
  const { data: userFollowers } = useQuery({
    queryKey: ["followers", { uid: userInfo?.uid }],
    queryFn: () =>
      !profileUid
        ? Promise.reject(new Error("undefined"))
        : relationApi.getUserFollowers({ uid: profileUid }),
    enabled: !!userInfo?.uid,
  });

  // follow mutation
  const { mutate: followUser, isLoading: followingLoading } = useMutation({
    mutationFn: () =>
      !profileUid
        ? Promise.reject(new Error("undefined"))
        : relationApi.followUser({ uid: profileUid }),
    onSuccess: () => {
      queryClient.invalidateQueries(["followers", { uid: profileUid }]);
    },
  });

  // unfollow mutation
  const { mutate: unfollowUser, isLoading: unfollowingLoading } = useMutation({
    mutationFn: () =>
      !profileUid
        ? Promise.reject(new Error("undefined"))
        : relationApi.unfollowUser({ uid: profileUid }),
    onSuccess: () => {
      queryClient.invalidateQueries(["followers", { uid: profileUid }]);
    },
  });

  const { uid: clientUid } = useUserStore();

  return (
    <>
      <Card
        borderRadius={"1em"}
        bgColor={ThemeColor.backgroundColor}
        color={"white"}
      >
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Contact title="#ID" content={userInfo?.usercode} />
            <Contact
              {...register("company")}
              title="🏢 Company"
              content={contactInfo?.company}
              change={clientUid === profileUid}
              onSubmit={onSubmit}
            />
            <Contact
              {...register("location")}
              title="🗺️ Location"
              content={contactInfo?.location}
              change={clientUid === profileUid}
              onSubmit={onSubmit}
            />
            <Contact
              {...register("contact")}
              title="☏ Contact"
              content={contactInfo?.contact}
              change={clientUid === profileUid}
              onSubmit={onSubmit}
            />
          </Stack>
        </CardBody>
      </Card>
      {!!clientUid &&
        clientUid !== profileUid &&
        (userFollowers?.includes(clientUid) ? (
          <Button variant="solid" onClick={() => unfollowUser()}>
            {unfollowingLoading ? <Spinner /> : "Unfollow"}
          </Button>
        ) : (
          <Button variant="outline" onClick={() => followUser()}>
            {followingLoading ? <Spinner /> : "Follow"}
          </Button>
        ))}
      {isLoading && <Spinner />}
    </>
  );
};

export default ProfileContact;

type ContactProps = {
  title: string;
  content?: string;
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
            {content || <Spinner />}
          </Text>
        )}
      </Box>
    );
  }
);
