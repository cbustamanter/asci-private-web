import { mode } from "@chakra-ui/theme-tools";

export const LoginStyle = {
  // style object for base or default style
  baseStyle: (props: any) => ({
    background: mode("white", "white")(props),
    color: "platedark",
    rounded: "sm",
    boxShadow: "lg",
    fontSize: "14px",
    lineHeight: "20px",
  }),
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {},
  // default values for `size` and `variant`
  defaultProps: {
    size: "",
  },
};
