export const AnswerOptionStyle = {
  parts: ["Container", "Letter", "Text", "Radio"],
  baseStyle: {
    Container: {
      display: "flex",
      p: 4,
      bg: "blue.700",
      borderRadius: "4px",
      border: "2px solid",
      cursor: "pointer",
      borderColor: "blue.400",
    },
    Letter: {
      fontWeight: "bold",
    },
    Text: {
      ml: 2,
    },
    Radio: {
      display: "none",
    },
  },
  variants: {
    selected: {
      Container: {
        bg: "rgba(20, 136, 243, 0.15)",
        borderColor: "blue.500",
      },
      Radio: {
        ml: "auto",
        display: "block",
      },
    },
  },
};
