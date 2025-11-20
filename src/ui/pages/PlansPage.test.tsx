import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// ====== Mocks configurables ======
const navigateMock = vi.fn();
const dispatchMock = vi.fn();
let mockState: any;

// mock para GetPlansForUserUseCase.execute()
const executePlansMock = vi.fn();

// ====== Mocks de módulos ======

// react-router-dom → solo useNavigate
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

// Contexto global
vi.mock("../context/AppContext", () => ({
  useAppContext: () => ({
    state: mockState,
    dispatch: dispatchMock,
  }),
}));

// Layout
vi.mock("../components/layout/RimacLayout", () => ({
  RimacLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="layout-mock">{children}</div>
  ),
}));

// UseCases
vi.mock("../../domain/usecases/GetUserUseCase", () => {
  return {
    GetUserUseCase: class {
      execute() {
        // devolvemos un usuario “Rocío”
        return Promise.resolve({
          name: "Rocío",
          lastName: "Pérez",
          birthDay: "1990-01-01",
          documentType: "DNI",
          documentNumber: "12345678",
          phone: "999999999",
          age: 34,
        });
      }
    },
  };
});

vi.mock("../../domain/usecases/GetPlansForUserUseCase", () => {
  return {
    GetPlansForUserUseCase: class {
      // el repo no nos interesa en el test
      constructor(_: any) {}
      execute() {
        return executePlansMock();
      }
    },
  };
});

// StepsHeader
vi.mock("@ui/components/navigation/StepsHeader", () => ({
  StepsHeader: ({ currentStepId }: { currentStepId: number }) => (
    <div data-testid="steps-header">Paso actual: {currentStepId}</div>
  ),
}));

// PlansCarousel
vi.mock("@ui/components/plans/PlansCarousel", () => ({
  PlansCarousel: ({ plans, onSelect }: any) => (
    <div data-testid="plans-carousel">
      {plans.map((p: any) => (
        <div key={p.name}>
          <span>{p.name}</span>
          <button onClick={() => onSelect(p)}>Elegir {p.name}</button>
        </div>
      ))}
    </div>
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
vi.mock("@assets/images/plans/IcAddUserLight.png", () => ({
  default: "/mock-add-user.png",
}));
vi.mock("@assets/images/plans/IcProtectionLight.png", () => ({
  default: "/mock-protection.png",
}));

// ====== Helpers ======
const mockPlans = [
  {
    name: "Plan 1",
    price: 100,
    originalPrice: 120,
    description: ["desc 1"],
    age: 18,
    ageLimit: 60,
    recommended: false,
  },
  {
    name: "Plan 2",
    price: 150,
    originalPrice: 170,
    description: ["desc 2"],
    age: 18,
    ageLimit: 60,
    recommended: true,
  },
  {
    name: "Plan 3",
    price: 200,
    originalPrice: 220,
    description: ["desc 3"],
    age: 18,
    ageLimit: 60,
    recommended: false,
  },
  {
    name: "Plan 4",
    price: 250,
    originalPrice: 270,
    description: ["desc 4"],
    age: 18,
    ageLimit: 60,
    recommended: false,
  },
  {
    name: "Plan 5",
    price: 300,
    originalPrice: 320,
    description: ["desc 5"],
    age: 18,
    ageLimit: 60,
    recommended: false,
  },
  {
    name: "Plan 6",
    price: 350,
    originalPrice: 370,
    description: ["desc 6"],
    age: 18,
    ageLimit: 60,
    recommended: false,
  },
];

describe("<PlansPage />", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // estado inicial del contexto
    mockState = {
      user: { name: "Rocío" },
      quoteMode: "me",
      selectedPlan: null,
    };

    // por defecto, el usecase de planes devuelve lista de 6
    executePlansMock.mockResolvedValue(mockPlans);
  });

  const renderPlansPage = async () => {
    const { PlansPage } = await import("./PlansPage");
    return render(<PlansPage />);
  };

  it("debe mostrar mensaje de carga y luego renderizar el carrusel de planes", async () => {
    await renderPlansPage();

    // mientras se cargan planes
    expect(screen.getByText("Cargando planes...")).toBeInTheDocument();

    // cuando termina el fetch, debe mostrarse el carrusel
    await waitFor(() => {
      expect(screen.getByTestId("plans-carousel")).toBeInTheDocument();
    });
  });

  it("debe mostrar mensaje de error si falla la carga de planes", async () => {
    executePlansMock.mockRejectedValueOnce(new Error("Network error"));

    await renderPlansPage();

    await waitFor(() => {
      expect(
        screen.getByText("Ocurrió un error al cargar los planes.")
      ).toBeInTheDocument();
    });

    // y no se muestra el carrusel
    expect(screen.queryByTestId("plans-carousel")).not.toBeInTheDocument();
  });

  it("debe usar el nombre del usuario en el título si está en contexto", async () => {
    await renderPlansPage();

    // title con innerHTML: "Rocío ¿Para quién deseas <br/> cotizar?"
    expect(
      screen.getByText(/Rocío .*Para quién deseas cotizar\?/i)
    ).toBeInTheDocument();
  });

  it('debe cambiar el modo de cotización al hacer click en "Para alguien más"', async () => {
    await renderPlansPage();

    // Buscar específicamente el botón, no el span
    const otherButton = screen.getByRole("button", {
      name: /Para alguien más/i,
    });

    fireEvent.click(otherButton);

    expect(dispatchMock).toHaveBeenCalledWith({
      type: "SET_QUOTE_MODE",
      payload: "other",
    });
  });

  it('debe filtrar primeros 3 planes cuando quoteMode es "me"', async () => {
    mockState.quoteMode = "me";

    await renderPlansPage();

    await waitFor(() => {
      expect(screen.getByTestId("plans-carousel")).toBeInTheDocument();
    });

    expect(screen.getByText("Plan 1")).toBeInTheDocument();
    expect(screen.getByText("Plan 2")).toBeInTheDocument();
    expect(screen.getByText("Plan 3")).toBeInTheDocument();

    expect(screen.queryByText("Plan 4")).not.toBeInTheDocument();
  });

  it('debe filtrar últimos 3 planes cuando quoteMode es "other"', async () => {
    mockState.quoteMode = "other";

    await renderPlansPage();

    await waitFor(() => {
      expect(screen.getByTestId("plans-carousel")).toBeInTheDocument();
    });

    expect(screen.getByText("Plan 4")).toBeInTheDocument();
    expect(screen.getByText("Plan 5")).toBeInTheDocument();
    expect(screen.getByText("Plan 6")).toBeInTheDocument();

    expect(screen.queryByText("Plan 1")).not.toBeInTheDocument();
  });

  it('debe navegar hacia atrás cuando se hace click en el botón "Volver"', async () => {
    await renderPlansPage();

    const backButton = screen.getByText("Volver");

    fireEvent.click(backButton);

    expect(navigateMock).toHaveBeenCalledWith(-1);
  });

  it("debe despachar SET_PLAN y navegar a /summary al seleccionar un plan", async () => {
    await renderPlansPage();

    await waitFor(() => {
      expect(screen.getByTestId("plans-carousel")).toBeInTheDocument();
    });

    const selectButton = screen.getByText("Elegir Plan 1");
    fireEvent.click(selectButton);

    expect(dispatchMock).toHaveBeenCalledWith({
      type: "SET_PLAN",
      payload: mockPlans[0],
    });

    expect(navigateMock).toHaveBeenCalledWith("/summary");
  });
});
