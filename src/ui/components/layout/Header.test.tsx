import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

// Mock de los assets
vi.mock("@assets/brand.png", () => ({
  default: "/mock-brand.png",
}));

vi.mock("@assets/icons/iconCel.svg", () => ({
  default: "/mock-cel-icon.svg",
}));

describe("<Header />", () => {
  it("debe renderizar el logo principal", () => {
    render(<Header />);

    const logo = screen.getAllByAltText("Logo")[0];

    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/mock-brand.png");
  });

  it("debe mostrar el texto informativo", () => {
    render(<Header />);

    const text = screen.getByText("¡Compra por este medio!");
    expect(text).toBeInTheDocument();
  });

  it("debe renderizar el enlace telefónico con el número correcto", () => {
    render(<Header />);

    const link = screen.getByRole("link", { name: /\(01\) 411 6001/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "tel:(01) 411 6001");
  });

  it("debe renderizar el ícono de celular dentro del enlace", () => {
    render(<Header />);

    const logos = screen.getAllByAltText("Logo");
    // El segundo "Logo" es el del ícono de celular
    const celIcon = logos[1];

    expect(celIcon).toBeInTheDocument();
    expect(celIcon).toHaveAttribute("src", "/mock-cel-icon.svg");
  });

  it("debe tener la estructura básica del header", () => {
    render(<Header />);

    const header = document.querySelector(".l-rimac__header");
    const info = document.querySelector(".l-rimac__header--information");

    expect(header).toBeInTheDocument();
    expect(info).toBeInTheDocument();
  });
});
