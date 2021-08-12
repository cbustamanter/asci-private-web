import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { ButtonStyle as Button } from "./styles/components/ButtonStyle";
import { FormLabelStyle as FormLabel } from "./styles/components/FormLabelStyle";
import { InputOrTextareaStyle as InputOrTextarea } from "./styles/components/InputOrTextareaStyle";
import { LinkStyle as Link } from "./styles/components/LinkStyle";
import { LoginStyle as LoginWrapper } from "./styles/components/LoginStyle";
import { SelectFieldStyle as SelectField } from "./styles/components/SelectFieldStyle";
import { TabStyle as Tabs } from "./styles/components/TabSyle";
import { SidebarItemStyle as SidebarItem } from "./styles/components/SidebarItemStyle";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
  styles: {
    global: {
      body: {
        background: "blue.900",
        overflowX: "hidden",
      },
    },
  },
  colors: {
    blue: {
      100: "#d0eaff",
      400: "#373F58",
      500: "#1488F3",
      600: "#434B69",
      700: "#232B47",
      800: "#28314E",
      900: "#1B233E",
    },
    black: "#16161D",
    platedark: "#3E4B61",
    platelight: "#677487",
    platedarker: "#1F263E",
    darkred: "#7A0B0B",
    darkplate: "#9399AD",
    green: "#21D07C",
  },
  components: {
    Button,
    LoginWrapper,
    InputOrTextarea,
    FormLabel,
    SelectField,
    Tabs,
    Link,
    SidebarItem,
  },
  fonts,
  breakpoints,
});

export default theme;
