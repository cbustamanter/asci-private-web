export const SidebarItemStyle = {
  parts: ["Icon", "Text"],
  baseStyle: {
    Icon: {
      color: "darkplate",
      fontSize: "24px",
    },
    Text: {
      color: "darkplate",
      fontWeight: "bold",
    },
  },
  variants: {
    active: {
      Icon: {
        color: "blue.500",
      },
      Text: {
        color: "white",
      },
    },
  },
  defaultProps: {},
};
