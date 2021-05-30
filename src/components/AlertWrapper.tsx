import { Alert, AlertStatus, AlertTitle, Box } from "@chakra-ui/react";
import React from "react";

type AlertWrapperProps = {
  error: string;
  status?: AlertStatus;
};

export const AlertWrapper: React.FC<AlertWrapperProps> = ({
  error,
  status,
}) => {
  if (!status) {
    status = "error";
  }
  const STATUSES = {
    info: { borderColor: "blue", color: "black" },
    warning: { borderColor: "orange", color: "black" },
    success: { borderColor: "green", color: "black" },
    error: { borderColor: "#D20808", color: "darkred" },
  };
  return (
    <Alert
      mb={4}
      variant="left-accent"
      color={STATUSES[status].color}
      borderColor={STATUSES[status].borderColor}
      borderRadius="lg"
      status={status}
    >
      <AlertTitle fontWeight="normal" fontSize={14.22} mr={2}>
        {error}
      </AlertTitle>
    </Alert>
  );
};
AlertWrapper.defaultProps = {
  status: "error",
};
