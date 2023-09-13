import { DeleteIcon } from "@chakra-ui/icons";
import { Button, Text, useMediaQuery } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import authApi from "../../../api/authApi";
import { ThemeColor } from "../../../common/styles/theme.style";
import useUserStore from "../../../store/user.zustand";

const ProfileSetting = () => {
  const { t, i18n } = useTranslation();

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

  const { mutate: deleteAccount } = useMutation({
    mutationFn: () => {
      if (window.confirm(t("auth.confirm_delete_account") || ""))
        return authApi.deleteAccount();
      return Promise.reject(new Error("User canceled"));
    },
    onSuccess: () => {
      clientSignOut();
      navigate("/");
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return (
    <>
      {!!uid && (
        <>
          <div>
            <SettingButton onClick={() => signOut()} color="orange">
              🚪 Sign out
            </SettingButton>
          </div>
          <br />
          <div>
            <SettingButton onClick={() => deleteAccount()} color="red">
              <DeleteIcon /> Delete account
            </SettingButton>
          </div>
        </>
      )}
    </>
  );
};

type SettingButtonProps = {
  onClick: () => void;
  color: string;
  children?: React.ReactNode;
};

const SettingButton = ({ onClick, color, children }: SettingButtonProps) => {
  const [smallerThanMediaThreshold] = useMediaQuery("(max-width: 700px)");
  return (
    <Button
      onClick={onClick}
      variant="outline"
      width={smallerThanMediaThreshold ? "80%" : "50%"}
      fontSize="0.8em"
      color={color}
      _hover={{ bg: ThemeColor.backgroundColor }}
    >
      {children}
    </Button>
  );
};

export default ProfileSetting;
