export const InputOrTextareaStyle = {
  // style object for base or default style
  baseStyle: ({ colorMode }: any) => ({
    color: colorMode === "dark" ? "white" : "platedark",
    fontSize: "14.5px",
    lineHeight: "20px",
    borderColor: "#D4D8DD",
    backgroundColor: colorMode === "dark" ? "gray.800" : "white",
    _placeholder: {
      color: "platelight",
    },
    rounded: "sm",
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
