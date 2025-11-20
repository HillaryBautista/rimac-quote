import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

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
      {/* Desktop / tablet: grilla de 3 columnas */}
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
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={24}
          slidesPerView={1}
        >
          {plans.map((plan) => (
            <SwiperSlide key={plan.name}>
              <PlanCard plan={plan} onSelect={() => onSelect(plan)} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
