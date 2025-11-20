import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

// Mock del asset (imagen)
vi.mock("@assets/brandLight.png", () => ({
  default: "/mock-logo.png",
}));

describe("<Footer />", () => {
  it("debe renderizar el logo", () => {
    render(<Footer />);

    const image = screen.getByAltText("Logo");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/mock-logo.png");
  });

  it("debe mostrar el año actual dinámicamente", () => {
    const currentYear = new Date().getFullYear();

    render(<Footer />);

    const text = screen.getByText(
      `© ${currentYear} RIMAC Seguros y Reaseguros.`
    );

    expect(text).toBeInTheDocument();
  });

  it("debe tener la estructura básica del footer", () => {
    render(<Footer />);

    const footer = document.querySelector(".l-rimac__footer");
    const container = document.querySelector(".l-rimac__footer--container");

    expect(footer).toBeInTheDocument();
    expect(container).toBeInTheDocument();
  });

  it("debe renderizar el separador <hr />", () => {
    render(<Footer />);

    const hr = document.querySelector("hr");
    expect(hr).toBeInTheDocument();
  });
});
