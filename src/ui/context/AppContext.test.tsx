import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { AppProvider, useAppContext } from "./AppContext";

// Componente de prueba para consumir el contexto
const ConsumerComponent = () => {
  const { state, dispatch } = useAppContext();

  return (
    <div>
      <span data-testid="has-state">{!!state ? "true" : "false"}</span>
      <span data-testid="has-dispatch">{!!dispatch ? "true" : "false"}</span>
    </div>
  );
};

describe("AppContext", () => {
  it("debe proveer state y dispatch dentro de AppProvider", () => {
    render(
      <AppProvider>
        <ConsumerComponent />
      </AppProvider>
    );

    const stateElement = screen.getByTestId("has-state");
    const dispatchElement = screen.getByTestId("has-dispatch");

    expect(stateElement.textContent).toBe("true");
    expect(dispatchElement.textContent).toBe("true");
  });

  it("useAppContext debe lanzar error si no está dentro de AppProvider", () => {
    // Evitamos que el error ensucie la salida del test
    const originalError = console.error;
    console.error = () => {};

    const BrokenComponent = () => {
      useAppContext();
      return <div>Broken</div>;
    };

    expect(() => render(<BrokenComponent />)).toThrowError(
      "useAppContext must be used within AppProvider"
    );

    console.error = originalError;
  });
});
