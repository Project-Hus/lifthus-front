import { Button, Text } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../../../api/authApi";
import { ThemeColor } from "../../../common/styles/theme.style";
import useUserStore from "../../../store/user.zustand";

const ProfileSetting = () => {
  const navigate = useNavigate();
  const { signOut: clientSignOut } = useUserStore();
  const { uid } = useUserStore();
  const { mutate: signOut } = useMutation({
    mutationFn: () => authApi.signOut(),
    onSuccess: () => {
      clientSignOut();
      navigate("/");
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return (
    <div>
      {!!uid && (
        <SettingButton onClick={() => signOut()} color="orange">
          🚪 Sign out
        </SettingButton>
      )}
    </div>
  );
};

type SettingButtonProps = {
  onClick: () => void;
  color: string;
  children?: React.ReactNode;
};

const SettingButton = ({ onClick, color, children }: SettingButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      width="50%"
      fontSize="0.8em"
      color={color}
      _hover={{ bg: ThemeColor.backgroundColor }}
    >
      {children}
    </Button>
  );
};

export default ProfileSetting;
