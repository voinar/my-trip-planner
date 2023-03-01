import { useState } from "react";

export const useErrorMessage = () => {
  const [errorMessage, setErrorMessage] = useState("");

  return {
    errorMessage,
    setErrorMessage
  };
};
