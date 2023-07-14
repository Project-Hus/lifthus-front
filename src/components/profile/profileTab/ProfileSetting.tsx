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
      authApi.signOut();
      clientSignOut();
      navigate("/");
    },
  });
  return (
    <div>
      <Button onClick={() => signOut()}>Sign out</Button>
      <Button
        onClick={() => {
          window.location.href = "https://auth.cloudhus.com/auth/test/cookie";
        }}
      >
        COOKIE TEST
      </Button>
    </div>
  );
};

export default ProfileSetting;
