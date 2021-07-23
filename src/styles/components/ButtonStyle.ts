export const ButtonStyle = {
  // style object for base or default style
  baseStyle: {
    rounded: "sm",
  },
  // styles for different sizes ("sm", "md", "lg")
  //   sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    paginate: {
      backgroundColor: "white",
      borderColor: "blue.900",
      fontWeight: "bold",
      rounded: "lg",
      fontSize: "12px",
      _disabled: {
        backgroundColor: "gray.200",
      },
      _active: {
        backgroundColor: "blue.100",
      },
      _hover: {
        backgroundColor: "blue.100",
      },
    },
    "outline-main": {
      backgroundColor: "transparent",
      color: "blue.500",
      rounded: "sm",
      border: "1px solid",
      borderColor: "blue.500",
    },
  },
  // default values for `size` and `variant`
  defaultProps: {
    colorScheme: "blue",
  },
};
