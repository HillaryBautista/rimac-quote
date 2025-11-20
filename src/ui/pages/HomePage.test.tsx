import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { HomePage } from "./HomePage";

// Mock de imagen
vi.mock("../../assets/heroImg.png", () => ({
  default: "/mock-hero.png",
}));

// Mock del Layout
vi.mock("../components/layout/RimacLayout", () => ({
  RimacLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="rimac-layout">{children}</div>
  ),
}));

// Mock del QuoteForm
vi.mock("../components/form/QuoteForm", () => ({
  QuoteForm: () => <div data-testid="quote-form">Mock QuoteForm</div>,
}));

describe("<HomePage />", () => {
  it("debe renderizar el layout base", () => {
    render(<HomePage />);

    const layout = screen.getByTestId("rimac-layout");
    expect(layout).toBeInTheDocument();
  });

  it("debe renderizar el título principal", () => {
    render(<HomePage />);

    const titles = screen.getAllByText("Creado para ti y tu familia");

    // Aparece dos veces (desktop y content)
    expect(titles.length).toBe(2);
  });

  it("debe renderizar el badge de seguro flexible", () => {
    render(<HomePage />);

    const badges = screen.getAllByText("Seguro Salud Flexible");

    expect(badges.length).toBe(2);
  });

  it("debe renderizar el subtítulo correctamente", () => {
    render(<HomePage />);

    expect(
      screen.getByText(/Tú eliges cuánto pagar. Ingresa tus datos/i)
    ).toBeInTheDocument();
  });

  it("debe renderizar la imagen principal con alt correcto", () => {
    render(<HomePage />);

    const image = screen.getByAltText("Familia protegida");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/mock-hero.png");
  });

  it("debe renderizar el formulario de cotización", () => {
    render(<HomePage />);

    const form = screen.getByTestId("quote-form");
    expect(form).toBeInTheDocument();
  });

  it("debe tener la estructura principal de la página", () => {
    const { container } = render(<HomePage />);

    const section = container.querySelector(".p-home");
    const imageContainer = container.querySelector(".p-home__image");
    const contentContainer = container.querySelector(".p-home__content");

    expect(section).toBeInTheDocument();
    expect(imageContainer).toBeInTheDocument();
    expect(contentContainer).toBeInTheDocument();
  });
});
