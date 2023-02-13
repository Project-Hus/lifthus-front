import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import { FormLabel } from "@chakra-ui/form-control";
import { Img } from "@chakra-ui/image";
import { Text, Link as LinkChakra } from "@chakra-ui/layout";
import React from "react";
import { Link } from "react-router-dom";
import { USER_PROFILE_IMAGE_ROUTE } from "../../../../common/routes";
import { ThemeColor } from "../../../../common/styles/theme.style";
import useUserStore from "../../../../store/user.zustand";

const ProfileCard = () => {
  const user_info = useUserStore();
  return (
    <Card
      bgColor={"blue.800"}
      color="white"
      border={`double ${ThemeColor.backgroundColorDarker}`}
      direction={{ base: "column", sm: "row" }}
      borderTopRadius={"1em"}
      borderBottomRadius={"0"}
    >
      <CardHeader display={"flex"}>
        <div>
          <Img
            src={USER_PROFILE_IMAGE_ROUTE + user_info.user_id + ".jpeg"}
            alt={`${user_info.nickname}'s profile image`}
            borderRadius={"2em"}
            objectFit={"cover"}
            width={"7em"}
            height={"7em"}
          />
        </div>
        <div>
          <div>
            <FormLabel
              display={"inline"}
              fontSize={"1.5em"}
              paddingLeft={"0.2em"}
            >
              {user_info.nickname}
            </FormLabel>
          </div>
          <div>
            <Text
              border={` ${ThemeColor.backgroundColorDarker}`}
              fontSize={"0.6em"}
              borderRadius="1em"
              padding="0.7em"
            >
              Thinking out loud ~ People fall in love in mysterious
            </Text>
          </div>
          <div style={{ textAlign: "right" }}>
            <Text fontSize={"0.6em"} padding="0.7em">
              <Link to="">
                <LinkChakra>{5} followers</LinkChakra>
              </Link>
              {" · "}
              <Link to="">
                <LinkChakra>{8} following</LinkChakra>
              </Link>
              {" · "}
              <Link to="">
                <LinkChakra>{2} groups</LinkChakra>
              </Link>
            </Text>
          </div>
        </div>
      </CardHeader>
      <CardBody></CardBody>
    </Card>
  );
};

export default ProfileCard;
