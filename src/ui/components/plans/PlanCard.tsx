import type { Plan } from "../../../domain/entities/Plan";

import IcHomeLight from "../../../assets/images/plans/IcHomeLight.png";
import IcHospitalLight from "../../../assets/images/plans/IcHospitalLight.png";

// Mapea nombres → iconos
const planIcons: Record<string, string> = {
  "Plan en Casa": IcHomeLight,
  "Plan en Casa y Clínica": IcHospitalLight,
  "Plan en Casa + Bienestar": IcHomeLight,
  "Plan en Casa + Chequeo ": IcHospitalLight,
  "Plan en Casa + Fitness": IcHomeLight,
};

interface Props {
  plan: Plan;
  onSelect: () => void;
}

export const PlanCard = ({ plan, onSelect }: Props) => {
  const icon = planIcons[plan.name] ?? IcHomeLight;
  const hasDiscount = !!plan.originalPrice && plan.originalPrice > plan.price;

  return (
    <article className="c-plan-card">
      {/* Badge superior */}
      {plan.recommended && (
        <span className="c-plan-card__badge">Plan recomendado</span>
      )}

      {/* Header */}
      <header className="c-plan-card__header">
        <div className="c-plan-card__head-left">
          <h3 className="c-plan-card__title">{plan.name}</h3>

          <div className="c-plan-card__price-box">
            <span className="c-plan-card__price-label">COSTO DEL PLAN</span>

            {hasDiscount && (
              <span className="c-plan-card__price-old">
                ${plan.originalPrice} antes
              </span>
            )}

            <span className="c-plan-card__price">
              ${plan.price.toFixed(2)} al mes
            </span>
          </div>
        </div>

        <img src={icon} alt={plan.name} className="c-plan-card__icon" />
      </header>

      <div className="c-plan-card__divider" />

      {/* Descripción */}
      <ul className="c-plan-card__list">
        {plan.description.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      {/* Botón */}
      <button className="c-btn c-btn--primary" onClick={onSelect}>
        Seleccionar plan
      </button>
    </article>
  );
};
