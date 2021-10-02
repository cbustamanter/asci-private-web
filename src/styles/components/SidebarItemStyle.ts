export const SidebarItemStyle = {
  parts: ["Icon", "Text"],
  baseStyle: {
    Icon: {
      color: "darkplate",
      fontSize: { base: "20px", md: "24px" },
    },
    Text: {
      display: { base: "none", md: "block" },
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
