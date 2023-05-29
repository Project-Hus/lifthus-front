import { Button } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../../../api/authApi";
import useUserStore from "../../../store/user.zustand";

const ProfileSetting = () => {
  const navigate = useNavigate();
  const { signOut: clientSignOut } = useUserStore();

  const { mutate: signOut } = useMutation({
    mutationFn: () => authApi.signOut(),
    onSuccess: () => {
      clientSignOut();
    },
  });
  return (
    <div>
      <Button onClick={() => signOut()}>Sign out</Button>
    </div>
  );
};

export default ProfileSetting;
