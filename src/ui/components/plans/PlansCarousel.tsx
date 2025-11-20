import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import type { Plan } from "../../../domain/entities/Plan";
import { PlanCard } from "./PlanCard";

type PlansCarouselProps = {
  plans: Plan[];
  onSelect(plan: Plan): void;
};

export const PlansCarousel: React.FC<PlansCarouselProps> = ({
  plans,
  onSelect,
}) => {
  if (!plans || plans.length === 0) {
    return (
      <div className="plans-carousel__empty">
        <p>No hay planes disponibles.</p>
      </div>
    );
  }

  return (
    <div className="plans-carousel">
      {/* Desktop / tablet: grilla */}
      <div className="plans-carousel__grid">
        {plans.map((plan) => (
          <div key={plan.name} className="plans-carousel__grid-item">
            <PlanCard plan={plan} onSelect={() => onSelect(plan)} />
          </div>
        ))}
      </div>

      {/* Mobile: slider */}
      <div className="plans-carousel__slider">
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{
            el: ".plans-carousel__fraction",
            type: "fraction",
            renderFraction: (currentClass, totalClass) =>
              `<span class="${currentClass}"></span>
               <span>/</span>
               <span class="${totalClass}"></span>`,
          }}
          navigation={{
            prevEl: ".plans-carousel__nav--prev",
            nextEl: ".plans-carousel__nav--next",
          }}
        >
          {plans.map((plan) => (
            <SwiperSlide key={plan.name}>
              <PlanCard plan={plan} onSelect={() => onSelect(plan)} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Controles -->
          <   1 / 3   > 
        */}
        <div className="plans-carousel__controls">
          <button
            className="plans-carousel__nav plans-carousel__nav--prev"
            aria-label="Plan anterior"
          >
            <IoChevronBack size={18} />
          </button>

          <div className="plans-carousel__fraction" />

          <button
            className="plans-carousel__nav plans-carousel__nav--next"
            aria-label="Siguiente plan"
          >
            <IoChevronForward size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
