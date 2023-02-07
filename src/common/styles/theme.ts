// Setting Chakra UI's default color
import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
const theme = extendTheme(
  {
    colors: {
      brand: {
        50: "#d8f5ff",
        900: "#aae4ff",
        800: "#7bd6ff",
        700: "#4acbfe",
        600: "#5dd1f1",
        500: "#03baec",
        400: "#007fb1",
        300: "#005280",
        200: "#002d4f",
        100: "#000e1e",
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: "brand",
  })
);
export default theme;
