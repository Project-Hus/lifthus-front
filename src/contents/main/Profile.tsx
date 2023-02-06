import React from "react";

import { Button, FormLabel, Input } from "@chakra-ui/react";
import BigCard from "../../common/components/BigCard";

const Profile = () => {
  return (
    <div>
      <BigCard title="Hello" link="/" contents={{ a: "bcd", c: 123 }} />
      <Input type="password"></Input>
    </div>
  );
};

export default Profile;
