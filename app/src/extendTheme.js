import { extendTheme } from "@chakra-ui/react";
import { theme } from "@chakra-ui/pro-theme";
const myTheme = extendTheme(
  {
    colors: { ...theme.colors, brand: theme.colors.purple },
    fonts: {
      heading: `'Open Sans', sans-serif`,
      body: `'Raleway', sans-serif`,
    },
  },
  theme
);
export default myTheme;
