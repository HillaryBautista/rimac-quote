import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QuoteForm } from "./QuoteForm";
import type { QuoteFormFields } from "./rules";

// ---- Mocks compartidos ----
const navigateMock = vi.fn();
const dispatchMock = vi.fn();

// Mock de react-router-dom (solo useNavigate)
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

// Mock del contexto
vi.mock("../../context/AppContext", () => ({
  useAppContext: () => ({
    state: {},
    dispatch: dispatchMock,
  }),
}));

// Mock de react-hook-form
import { useForm } from "react-hook-form";

vi.mock("react-hook-form", () => ({
  useForm: vi.fn(),
}));

describe("<QuoteForm />", () => {
  let submitCallback: ((data: QuoteFormFields) => void) | undefined;

  beforeEach(() => {
    vi.clearAllMocks();
    // Configuramos qué devuelve useForm ANTES de renderizar el componente
    (useForm as unknown as vi.Mock).mockReturnValue({
      register: vi.fn(),
      handleSubmit: (fn: (data: QuoteFormFields) => void) => {
        // guardamos la función onSubmit interna del componente
        submitCallback = fn;
        // retornamos un onSubmit fake (la función que React asigna al form)
        return vi.fn();
      },
      formState: { errors: {} },
      getValues: vi.fn(),
    });
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <QuoteForm />
      </MemoryRouter>
    );

  it("debe despachar UPDATE_USER_CONTACT y navegar a /plans cuando el formulario es válido", () => {
    renderComponent();

    // Simulamos que react-hook-form llama a onSubmit con datos válidos
    const validData: QuoteFormFields = {
      documentType: "DNI",
      documentNumber: "12345678",
      phone: "987654321",
      acceptPrivacy: true,
      acceptComms: false,
    };

    // Nos aseguramos de que submitCallback exista
    expect(submitCallback).toBeDefined();

    submitCallback!(validData);

    // Se debe llamar al dispatch con los datos de contacto
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith({
      type: "UPDATE_USER_CONTACT",
      payload: {
        documentType: "DNI",
        documentNumber: "12345678",
        phone: "987654321",
      },
    });

    // Y navegar a /plans
    expect(navigateMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith("/plans");
  });
});
