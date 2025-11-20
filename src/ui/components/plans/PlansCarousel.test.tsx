import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PlansCarousel } from "./PlansCarousel";
import type { Plan } from "../../../domain/entities/Plan";

// ===== Mocks =====

// Variable para capturar las props que se le pasan a Swiper
let lastSwiperProps: any;

// Mock de Swiper
vi.mock("swiper/react", () => ({
  Swiper: (props: any) => {
    lastSwiperProps = props;
    return <div data-testid="swiper">{props.children}</div>;
  },
  SwiperSlide: ({ children }: any) => (
    <div data-testid="swiper-slide">{children}</div>
  ),
}));

vi.mock("swiper/modules", () => ({
  Pagination: {},
  Navigation: {},
}));

vi.mock("swiper/css", () => ({}));
vi.mock("swiper/css/pagination", () => ({}));
vi.mock("swiper/css/navigation", () => ({}));

// Mock de PlanCard
vi.mock("./PlanCard", () => ({
  PlanCard: ({ plan, onSelect }: any) => (
    <div data-testid="plan-card">
      <span>{plan.name}</span>
      <button onClick={onSelect}>Seleccionar</button>
    </div>
  ),
}));

// ===== DATA MOCK =====

const mockPlans: Plan[] = [
  {
    name: "Plan en Casa",
    price: 100,
    originalPrice: 150,
    description: ["Cobertura básica"],
    age: 18,
    ageLimit: 60,
    recommended: false,
  },
  {
    name: "Plan en Casa y Clínica",
    price: 200,
    originalPrice: 250,
    description: ["Cobertura completa"],
    age: 18,
    ageLimit: 60,
    recommended: true,
  },
];

// ===== TESTS =====

describe("<PlansCarousel />", () => {
  beforeEach(() => {
    lastSwiperProps = undefined;
  });

  it("debe mostrar mensaje cuando no hay planes", () => {
    render(<PlansCarousel plans={[]} onSelect={vi.fn()} />);

    expect(
      screen.getByText("No hay planes disponibles.")
    ).toBeInTheDocument();
  });

  it("debe renderizar los planes en la grilla", () => {
    render(<PlansCarousel plans={mockPlans} onSelect={vi.fn()} />);

    const gridItems = document.querySelectorAll(".plans-carousel__grid-item");
    expect(gridItems.length).toBe(mockPlans.length);
  });

  it("debe renderizar el slider con los planes", () => {
    render(<PlansCarousel plans={mockPlans} onSelect={vi.fn()} />);

    const swiper = screen.getByTestId("swiper");
    const slides = screen.getAllByTestId("swiper-slide");

    expect(swiper).toBeInTheDocument();
    expect(slides.length).toBe(mockPlans.length);
  });

  it("debe renderizar todas las tarjetas de planes", () => {
    render(<PlansCarousel plans={mockPlans} onSelect={vi.fn()} />);

    const cards = screen.getAllByTestId("plan-card");
    // 2 por grid + 2 por slider
    expect(cards.length).toBe(mockPlans.length * 2);
  });

  it("debe ejecutar onSelect cuando se selecciona un plan", () => {
    const onSelectMock = vi.fn();

    render(<PlansCarousel plans={mockPlans} onSelect={onSelectMock} />);

    const buttons = screen.getAllByText("Seleccionar");

    fireEvent.click(buttons[0]); // click en el primero

    expect(onSelectMock).toHaveBeenCalledTimes(1);
    expect(onSelectMock).toHaveBeenCalledWith(mockPlans[0]);
  });

  it("debe renderizar los botones de navegación del slider", () => {
    render(<PlansCarousel plans={mockPlans} onSelect={vi.fn()} />);

    const prevButton = screen.getByLabelText("Plan anterior");
    const nextButton = screen.getByLabelText("Siguiente plan");

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it("debe renderizar la fracción de paginación", () => {
    render(<PlansCarousel plans={mockPlans} onSelect={vi.fn()} />);

    const fraction = document.querySelector(".plans-carousel__fraction");
    expect(fraction).toBeInTheDocument();
  });

  it("debe configurar correctamente la paginación fraccionaria de Swiper", () => {
    render(<PlansCarousel plans={mockPlans} onSelect={vi.fn()} />);

    // verificamos las props de paginación
    expect(lastSwiperProps).toBeDefined();
    expect(lastSwiperProps.pagination.type).toBe("fraction");
    expect(lastSwiperProps.pagination.el).toBe(".plans-carousel__fraction");

    // ejecutamos manualmente renderFraction para cubrir su lógica
    const html = lastSwiperProps.pagination.renderFraction("current", "total");

    expect(html).toContain('class="current"');
    expect(html).toContain('class="total"');
    expect(html).toContain("/");
  });

  it("debe configurar correctamente la navegación de Swiper", () => {
    render(<PlansCarousel plans={mockPlans} onSelect={vi.fn()} />);

    expect(lastSwiperProps.navigation.prevEl).toBe(
      ".plans-carousel__nav--prev"
    );
    expect(lastSwiperProps.navigation.nextEl).toBe(
      ".plans-carousel__nav--next"
    );
  });
});
