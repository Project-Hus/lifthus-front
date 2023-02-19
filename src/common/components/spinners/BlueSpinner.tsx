import React from "react";

import { Spinner } from "@chakra-ui/react";
import { ThemeColor } from "../../styles/theme.style";

const BlueSpinner = () => {
  return (
    <Spinner
      thickness="0.7rem"
      speed="2s"
      emptyColor={ThemeColor.backgroundColorDarker}
      color={ThemeColor.topButtonColor}
      size="xl"
    />
  );
};

export default BlueSpinner;
