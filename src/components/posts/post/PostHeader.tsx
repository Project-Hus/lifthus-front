import {
  ChevronDownIcon,
  CopyIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Link as LinkChakra,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { ThemeColor } from "../../../common/styles/theme.style";
import useUserStore from "../../../store/user.zustand";

type PostHeaderProps = {
  profileImageSrc: string;
  username: string;
  timestamp: Date;
};

export const PostHeader = ({
  profileImageSrc,
  username,
  timestamp,
}: PostHeaderProps) => {
  return (
    <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
      <Avatar src={profileImageSrc} />
      <Box>
        <LinkChakra as={Link} to={`/profile/${username}`}>
          <Heading fontSize="1.1em">{username}</Heading>
        </LinkChakra>
        <Text fontSize={"0.9em"} color="gray.400">
          {`${new Date(timestamp)}`.slice(0, 21)}
        </Text>
      </Box>
    </Flex>
  );
};

type PostMenuProps = {
  author: string;
  slug: string;
  setEditing: () => void;
  deletePost: () => void;
};

const PostMenu = ({ author, slug, setEditing, deletePost }: PostMenuProps) => {
  const { uid: clientUid } = useUserStore();
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            variant="unstyled"
            isActive={isOpen}
            as={Button}
            color="white"
            rightIcon={<ChevronDownIcon fontSize="2.2em" />}
          />
          <MenuList fontSize={"1em"} bgColor={ThemeColor.backgroundColorDarker}>
            <PostMenuItem
              color="white"
              hoverColor="white"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/post/${encodeURIComponent(slug)}`
                );
              }}
            >
              <CopyIcon />
              &nbsp;Copy URL
            </PostMenuItem>
            {author === clientUid && (
              <>
                <PostMenuItem
                  color="yellow.400"
                  hoverColor="yellow.500"
                  onClick={() => setEditing()}
                >
                  <EditIcon />
                  &nbsp;Edit
                </PostMenuItem>
                <PostMenuItem
                  color="red.400"
                  hoverColor="red.500"
                  onClick={() => deletePost()}
                >
                  <DeleteIcon />
                  &nbsp;Delete
                </PostMenuItem>
              </>
            )}
          </MenuList>
        </>
      )}
    </Menu>
  );
};

type MenuItemProps = {
  color: string;
  hoverColor: string;
  onClick: () => void;
  children: React.ReactNode;
};

const PostMenuItem = ({
  color,
  hoverColor,
  onClick,
  children,
}: MenuItemProps) => (
  <MenuItem
    bgColor={ThemeColor.backgroundColorDarker}
    color={color}
    _hover={{
      bgColor: ThemeColor.backgroundColor,
      hoverColor,
    }}
    onClick={onClick}
  >
    {children}
  </MenuItem>
);

export default PostMenu;
