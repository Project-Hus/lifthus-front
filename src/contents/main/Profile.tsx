import React from "react";

import { Button } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";

import useAppStore from "../../store/app.zustand";
import styled from "@emotion/styled";

const Profile = () => {
  const user_info = useAppStore((state) => state);
  return (
    <ProfileArea>
      <FormLabel fontSize={"1em"}>{user_info.nickname}</FormLabel>
      <hr style={{ minWidth: "100wh" }} />
      <Button>adsfdsfdas</Button>
    </ProfileArea>
  );
};

export default Profile;

const ProfileArea = styled.div`
  width: 80%;
`;
