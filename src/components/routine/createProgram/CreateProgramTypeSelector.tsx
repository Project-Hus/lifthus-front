import { Button } from "@chakra-ui/react";
import React from "react";
import { ThemeColor } from "../../../common/styles/theme.style";

type ProgramTypeSelectorProps = {
  typeSetter: (type: "none" | "weekly" | "daily") => void;
};

const ProgramTypeSelector = ({ typeSetter }: ProgramTypeSelectorProps) => {
  return (
    <div>
      <Button
        variant="unstyled"
        color="lightgreen"
        border="0.1rem solid"
        _hover={{ bgColor: ThemeColor.topButtonColor }}
        margin="0.5rem"
        marginRight="1rem"
        fontWeight="bold"
        fontSize="1.5rem"
        w="40%"
        onClick={() => {
          typeSetter("daily");
        }}
      >
        +DAY
      </Button>
      <Button
        variant="unstyled"
        color="skyblue"
        border="0.1rem solid"
        _hover={{ bgColor: ThemeColor.topButtonColor }}
        margin="0.5rem"
        marginLeft="1rem"
        fontWeight="bold"
        fontSize="1.5rem"
        w="40%"
        onClick={() => {
          typeSetter("weekly");
        }}
      >
        +WEEK
      </Button>
    </div>
  );
};

export default ProgramTypeSelector;
