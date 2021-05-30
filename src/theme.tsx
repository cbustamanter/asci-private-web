import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { createBreakpoints, mode } from "@chakra-ui/theme-tools";
import { LoginStyle as LoginWrapper } from "./styles/components/LoginStyle";
import { InputOrTextareaStyle as InputOrTextarea } from "./styles/components/InputOrTextareaStyle";
import { FormLabelStyle as FormLabel } from "./styles/components/FormLabelStyle";
const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme(
  withDefaultColorScheme({
    colorScheme: "blue",
    components: ["Button"],
  }),
  {
    colors: {
      blue: {
        500: "#1488F3",
        900: "#1B233E",
      },
      black: "#16161D",
      platedark: "#3E4B61",
      platelight: "#677487",
      platedarker: "#1F263E",
      darkred: "#7A0B0B",
      darkplate: "#9399AD",
    },
    components: {
      Button: {
        baseStyle: {
          rounded: "sm",
        },
      },
      LoginWrapper,
      InputOrTextarea,
      FormLabel,
    },
    fonts,
    breakpoints,
  }
);

export default theme;
