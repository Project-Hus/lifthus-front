import React from "react";

import { Button } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";

import useAppStore from "../../store/app.zustand";
import styled from "@emotion/styled";
import { Img } from "@chakra-ui/image";
import { USER_PROFILE_IMAGE_ROUTE } from "../../common/routes";

const Profile = () => {
  const user_info = useAppStore((state) => state);
  return (
    <ProfilePage>
      <ProfileArea>
        <div>
          <Img
            src={USER_PROFILE_IMAGE_ROUTE + user_info.user_id + ".jpeg"}
            borderRadius={"2em"}
            objectFit="cover"
            width={"5em"}
            height={"5em"}
          />
        </div>
        <div style={{ marginTop: "auto", marginLeft: "0.5em" }}>
          {user_info.nickname}
        </div>
        <div>
          <Button> LogOut</Button>
        </div>
      </ProfileArea>
      <div></div>
      <hr style={{ minWidth: "100wh" }} />
    </ProfilePage>
  );
};

export default Profile;

const ProfilePage = styled.div`
  width: 90%;
`;

const ProfileArea = styled.div`
  * {
    display: flex;
    flex-direction: row;
    margin-top: auto;
  }
`;
