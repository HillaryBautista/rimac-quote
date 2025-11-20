import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { StepsHeader } from "./StepsHeader";

// Mock del ícono
vi.mock("@assets/icons/iconButtonBack.svg", () => ({
  default: "/mock-back-icon.svg",
}));

const mockSteps = [
  { id: 1, label: "Datos personales" },
  { id: 2, label: "Planes" },
  { id: 3, label: "Resumen" },
];

describe("<StepsHeader />", () => {
  it("debe renderizar todos los pasos con sus labels", () => {
    render(<StepsHeader steps={mockSteps} currentStepId={1} />);

    expect(screen.getByText("Datos personales")).toBeInTheDocument();
    expect(screen.getByText("Planes")).toBeInTheDocument();
    expect(screen.getByText("Resumen")).toBeInTheDocument();
  });

  it("debe marcar correctamente el paso activo", () => {
    const { container } = render(
      <StepsHeader steps={mockSteps} currentStepId={2} />
    );

    const activeStep = container.querySelector(".c-steps__item--active");
    expect(activeStep).toBeInTheDocument();
    expect(activeStep).toHaveTextContent("2");
  });

  it("debe marcar correctamente los pasos completados", () => {
    const { container } = render(
      <StepsHeader steps={mockSteps} currentStepId={3} />
    );

    const completedSteps = container.querySelectorAll(
      ".c-steps__item--completed"
    );
    expect(completedSteps.length).toBe(2); // pasos 1 y 2 completados
  });

  it("debe mostrar el texto PASO X DE Y en mobile", () => {
    render(<StepsHeader steps={mockSteps} currentStepId={2} />);

    expect(screen.getByText("PASO 2 DE 3")).toBeInTheDocument();
  });

  it("debe calcular correctamente el progreso de la barra", () => {
    const { container } = render(
      <StepsHeader steps={mockSteps} currentStepId={2} />
    );

    const barFill = container.querySelector(
      ".c-steps__bar-fill"
    ) as HTMLElement;

    // Paso 2 de 3 = (2 / 3) * 100 = 66.66%
    expect(barFill.style.width).toBe("66.66666666666666%");
  });

  it("debe mostrar el botón volver si se pasa onBack", () => {
    const onBackMock = vi.fn();

    render(
      <StepsHeader steps={mockSteps} currentStepId={2} onBack={onBackMock} />
    );

    const backButton = screen.getByRole("button");
    expect(backButton).toBeInTheDocument();

    const icon = screen.getByAltText("Volver");
    expect(icon).toHaveAttribute("src", "/mock-back-icon.svg");
  });

  it("debe llamar a onBack cuando se hace click en el botón volver", () => {
    const onBackMock = vi.fn();

    render(
      <StepsHeader steps={mockSteps} currentStepId={2} onBack={onBackMock} />
    );

    const backButton = screen.getByRole("button");

    fireEvent.click(backButton);

    expect(onBackMock).toHaveBeenCalledTimes(1);
  });

  it("no debe renderizar botón volver si onBack no está definido", () => {
    render(<StepsHeader steps={mockSteps} currentStepId={1} />);

    const button = screen.queryByRole("button");

    expect(button).not.toBeInTheDocument();
  });
});
