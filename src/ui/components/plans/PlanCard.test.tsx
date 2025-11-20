import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PlanCard } from "./PlanCard";
import type { Plan } from "../../../domain/entities/Plan";

// Mock de iconos
vi.mock("@assets/images/plans/IcHomeLight.png", () => ({
  default: "/mock-home-icon.png",
}));

vi.mock("@assets/images/plans/IcHospitalLight.png", () => ({
  default: "/mock-hospital-icon.png",
}));

const mockPlan: Plan = {
  name: "Plan en Casa",
  price: 150,
  originalPrice: 200,
  description: [
    "Atención médica en casa",
    "Cobertura nacional",
    "Descuentos en farmacias",
  ],
  age: 18,
  ageLimit: 60,
  recommended: true,
};

describe("<PlanCard />", () => {
  it("debe renderizar el nombre del plan", () => {
    render(<PlanCard plan={mockPlan} onSelect={vi.fn()} />);

    expect(screen.getByText("Plan en Casa")).toBeInTheDocument();
  });

  it("debe renderizar el badge si el plan es recomendado", () => {
    render(<PlanCard plan={mockPlan} onSelect={vi.fn()} />);

    expect(screen.getByText("Plan recomendado")).toBeInTheDocument();
  });

  it("debe renderizar el precio actual formateado", () => {
    render(<PlanCard plan={mockPlan} onSelect={vi.fn()} />);

    expect(screen.getByText("$150.00 al mes")).toBeInTheDocument();
  });

  it("debe renderizar el precio antiguo si hay descuento", () => {
    render(<PlanCard plan={mockPlan} onSelect={vi.fn()} />);

    expect(screen.getByText("$200 antes")).toBeInTheDocument();
  });

  it("debe ocultar el precio anterior si no hay descuento", () => {
    const planWithoutDiscount: Plan = {
      ...mockPlan,
      originalPrice: undefined,
    };

    render(<PlanCard plan={planWithoutDiscount} onSelect={vi.fn()} />);

    expect(screen.queryByText(/\$.*antes/)).not.toBeInTheDocument();
  });

  it("debe renderizar todas las descripciones del plan", () => {
    render(<PlanCard plan={mockPlan} onSelect={vi.fn()} />);

    mockPlan.description.forEach((desc) => {
      expect(screen.getByText(desc)).toBeInTheDocument();
    });
  });

  it("debe renderizar el icono correcto según el nombre del plan", () => {
    render(<PlanCard plan={mockPlan} onSelect={vi.fn()} />);

    const icon = screen.getByAltText(mockPlan.name);

    expect(icon).toHaveAttribute("src", "/mock-home-icon.png");
  });

  it("debe usar el icono por defecto si el plan no está mapeado", () => {
    const unknownPlan: Plan = {
      ...mockPlan,
      name: "Plan desconocido",
    };

    render(<PlanCard plan={unknownPlan} onSelect={vi.fn()} />);

    const icon = screen.getByAltText("Plan desconocido");

    // por fallback debería usar IcHomeLight
    expect(icon).toHaveAttribute("src", "/mock-home-icon.png");
  });

  it("debe ejecutar onSelect al hacer click en el botón", () => {
    const onSelectMock = vi.fn();

    render(<PlanCard plan={mockPlan} onSelect={onSelectMock} />);

    const button = screen.getByRole("button", {
      name: "Seleccionar plan",
    });

    fireEvent.click(button);

    expect(onSelectMock).toHaveBeenCalledTimes(1);
  });

  it("no debe mostrar badge si el plan no es recomendado", () => {
    const notRecommendedPlan: Plan = {
      ...mockPlan,
      recommended: false,
    };

    render(<PlanCard plan={notRecommendedPlan} onSelect={vi.fn()} />);

    expect(screen.queryByText("Plan recomendado")).not.toBeInTheDocument();
  });
});
