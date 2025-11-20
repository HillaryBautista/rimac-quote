import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppRouter } from "./AppRouter";

// Mock de las páginas para no depender de su implementación real
vi.mock("../../ui/pages/HomePage", () => ({
  HomePage: () => <div>Home Page Mock</div>,
}));

vi.mock("../../ui/pages/PlansPage", () => ({
  PlansPage: () => <div>Plans Page Mock</div>,
}));

vi.mock("../../ui/pages/SummaryPage", () => ({
  SummaryPage: () => <div>Summary Page Mock</div>,
}));

describe("AppRouter", () => {
  it('debe renderizar HomePage cuando la ruta es "/"', () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText("Home Page Mock")).toBeInTheDocument();
  });

  it('debe renderizar PlansPage cuando la ruta es "/plans"', () => {
    render(
      <MemoryRouter initialEntries={["/plans"]}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText("Plans Page Mock")).toBeInTheDocument();
  });

  it('debe renderizar SummaryPage cuando la ruta es "/summary"', () => {
    render(
      <MemoryRouter initialEntries={["/summary"]}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText("Summary Page Mock")).toBeInTheDocument();
  });
});
