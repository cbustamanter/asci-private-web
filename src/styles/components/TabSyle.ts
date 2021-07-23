export const TabStyle = {
  variants: {
    main: {
      tab: {
        fontSize: "16px",
        lineHeight: "28px",
        fontWeight: 400,
        color: "darkplate",
        letterSpacing: "0.1em",
        borderBottom: "2px solid",
        borderColor: "transparent",
        _selected: {
          fontWeight: 700,
          color: "white",
          borderColor: "blue.500",
        },
        _hover: {
          fontWeight: 700,
          color: "white",
        },
      },
      tablist: {
        borderBottom: "1px solid",
        borderColor: "blue.400",
      },
    },
  },
};
