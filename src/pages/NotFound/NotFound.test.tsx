import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "./NotFound";

test("Render Not Found page", () => {
  render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  );

  const textElement = screen.getByText(/Oops/i);
  expect(textElement).toBeInTheDocument();
});
