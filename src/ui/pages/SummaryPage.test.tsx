import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// ---- Mocks configurables ----
const navigateMock = vi.fn();
let mockState: any;

// react-router-dom -> useNavigate
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

// Contexto
vi.mock("../context/AppContext", () => ({
  useAppContext: () => ({
    state: mockState,
  }),
}));

// Layout
vi.mock("../components/layout/RimacLayout", () => ({
  RimacLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="layout-mock">{children}</div>
  ),
}));

// StepsHeader
vi.mock("@ui/components/navigation/StepsHeader", () => ({
  StepsHeader: ({ currentStepId }: { currentStepId: number }) => (
    <div data-testid="steps-header">Paso actual: {currentStepId}</div>
  ),
}));

// QUOTE_STEPS
vi.mock("@ui/navigation/quoteSteps", () => ({
  QUOTE_STEPS: [
    { id: 1, label: "Planes y coberturas" },
    { id: 2, label: "Resumen" },
  ],
}));

// Assets
vi.mock("@assets/icons/iconButtonBack.svg", () => ({
  default: "/mock-back-icon.svg",
}));
vi.mock("@assets/icons/iconUser.svg", () => ({
  default: "/mock-user-icon.svg",
}));

describe("<SummaryPage />", () => {
  const validUser = {
    name: "Rocío",
    lastName: "Pérez",
    documentType: "DNI",
    documentNumber: "12345678",
    phone: "999999999",
  };

  const validPlan = {
    name: "Plan en Casa",
    price: 150,
  };

  const renderSummaryPage = async () => {
    const { SummaryPage } = await import("./SummaryPage");
    return render(<SummaryPage />);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe redirigir a "/" si no hay usuario o plan seleccionado', async () => {
    mockState = {
      user: null,
      selectedPlan: null,
    };

    await renderSummaryPage();

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/");
    });
  });

  it("debe renderizar todo correctamente si hay user y selectedPlan", async () => {
    mockState = {
      user: validUser,
      selectedPlan: validPlan,
    };

    await renderSummaryPage();

    expect(screen.getByTestId("layout-mock")).toBeInTheDocument();
    expect(screen.getByTestId("steps-header")).toHaveTextContent(
      "Paso actual: 2"
    );

    expect(screen.getByText("Resumen del seguro")).toBeInTheDocument();

    // Nombre completo
    expect(screen.getByText("Rocío Pérez")).toBeInTheDocument();

    // Datos del usuario
    expect(
      screen.getByText(`DNI: ${validUser.documentNumber}`)
    ).toBeInTheDocument();

    expect(screen.getByText(`Celular: ${validUser.phone}`)).toBeInTheDocument();

    // Plan elegido
    expect(screen.getByText(validPlan.name)).toBeInTheDocument();

    // Precio del plan
    expect(
      screen.getByText(`Costo del Plan: $${validPlan.price.toFixed(2)} al mes`)
    ).toBeInTheDocument();
  });

  it("debe renderizar los íconos correctamente", async () => {
    mockState = {
      user: validUser,
      selectedPlan: validPlan,
    };

    await renderSummaryPage();

    const backIcon = screen.getByAltText("Volver");
    const userIcon = screen.getByAltText("user icon");

    expect(backIcon).toHaveAttribute("src", "/mock-back-icon.svg");
    expect(userIcon).toHaveAttribute("src", "/mock-user-icon.svg");
  });

  it("debe llamar a navigate(-1) al hacer click en botón volver", async () => {
    mockState = {
      user: validUser,
      selectedPlan: validPlan,
    };

    await renderSummaryPage();

    const backButton = screen.getByText("Volver");

    fireEvent.click(backButton);

    expect(navigateMock).toHaveBeenCalledWith(-1);
  });
});
