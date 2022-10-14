import { extendTheme } from "@chakra-ui/react";
import { theme } from "@chakra-ui/pro-theme";
const myTheme = extendTheme(
  {
    colors: { ...theme.colors, brand: theme.colors.purple },
    fonts: {
      heading: `"Inter var", "Inter UI", Inter, -apple-system, system-ui, "Segoe UI", Roboto, Noto, Oxygen-Sans, Ubuntu, Cantrell, "Helvetica Neue", sans-serif`,
      body: `"Inter var", "Inter UI", Inter, -apple-system, system-ui, "Segoe UI", Roboto, Noto, Oxygen-Sans, Ubuntu, Cantrell, "Helvetica Neue", sans-serif`,
    },
  },
  theme
);
export default myTheme;
