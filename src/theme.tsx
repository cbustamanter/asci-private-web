import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { FormLabelStyle as FormLabel } from "./styles/components/FormLabelStyle";
import { InputOrTextareaStyle as InputOrTextarea } from "./styles/components/InputOrTextareaStyle";
import { LoginStyle as LoginWrapper } from "./styles/components/LoginStyle";
import { SelectFieldStyle as SelectField } from "./styles/components/SelectFieldStyle";
import { ButtonStyle as Button } from "./styles/components/ButtonStyle";
const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
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
    Button,
    LoginWrapper,
    InputOrTextarea,
    FormLabel,
    SelectField,
  },
  fonts,
  breakpoints,
});

export default theme;
