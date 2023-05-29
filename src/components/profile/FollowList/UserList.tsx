import { Box, Flex, Img, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../../../api/userApi";
import { ThemeColor } from "../../../common/styles/theme.style";

const UserList = ({ users }: { users: number[] }) => {
  const userList = users.map((uid) => <UserListItem key={uid} uid={uid} />);
  return <>{userList}</>;
};

const UserListItem = ({ uid }: { uid: number }) => {
  const navigate = useNavigate();
  const { data: user } = useQuery({
    queryKey: ["user", { uid }],
    queryFn: () => userApi.getUserInfo({ uid }),
  });
  return (
    <Flex
      borderBottom={"solid"}
      borderColor={ThemeColor.backgroundColorDarker}
      padding="0.3em"
      _hover={{ bg: ThemeColor.backgroundColorDarker }}
      align="center"
      onClick={() => navigate(`/profile/${user?.username}`)}
    >
      <Img
        src={user?.profile_image_url}
        sx={{
          w: "2em",
          borderRadius: "0.5em",
        }}
      />
      <Box ml="3">
        <Text fontWeight="bold">{user?.username}</Text>
      </Box>
    </Flex>
  );
};

export default UserList;
