import { Avatar } from "@chakra-ui/avatar";
import { Button, IconButton } from "@chakra-ui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/card";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import React from "react";
import {
  ChatIcon,
  ExternalLinkIcon,
  InfoOutlineIcon,
  StarIcon,
} from "@chakra-ui/icons";

const Rep = () => {
  return (
    <Card maxW="md">
      <CardHeader>
        <Flex letterSpacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />

            <Box>
              <Heading size="sm">Segun Adebayo</Heading>
              <Text>Creator, Chakra UI</Text>
            </Box>
          </Flex>
          <IconButton
            variant="ghost"
            colorScheme="gray"
            aria-label="See menu"
            icon={<InfoOutlineIcon />}
          />
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>
          With Chakra UI, I wanted to sync the speed of development with the
          speed of design. I wanted the developer to be just as excited as the
          designer to create a screen.
        </Text>
      </CardBody>
      <Image
        objectFit="cover"
        src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Chakra UI"
      />

      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        <Button flex="1" variant="ghost" leftIcon={<StarIcon />}>
          Like
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<ChatIcon />}>
          Comment
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<ExternalLinkIcon />}>
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Rep;
