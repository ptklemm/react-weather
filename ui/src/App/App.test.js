import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

it("renders without throwing an error", () => {
	render(<App />);
	expect(screen.getByLabelText("App")).toBeInTheDocument();
});
