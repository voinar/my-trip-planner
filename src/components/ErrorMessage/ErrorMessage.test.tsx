import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

test("Error message renders with sample error", () => {
  const errorMessage = "example error";
  const setErrorMessage = null;

  render(
    <ErrorMessage
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}
    />
  );

  const errorMessageText = screen.getByText(/example error/i);
  expect(errorMessageText).toBeInTheDocument();
});
