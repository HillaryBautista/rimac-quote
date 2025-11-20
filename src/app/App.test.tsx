import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { App } from "./App";

// Mockeamos AppRouter para verificar que se renderiza
vi.mock("./router/AppRouter", () => ({
  AppRouter: () => <div data-testid="app-router-mock">AppRouter</div>,
}));

describe("<App />", () => {
  it("debe renderizar el AppRouter", () => {
    render(<App />);

    const router = screen.getByTestId("app-router-mock");
    expect(router).toBeInTheDocument();
    expect(router).toHaveTextContent("AppRouter");
  });
});
