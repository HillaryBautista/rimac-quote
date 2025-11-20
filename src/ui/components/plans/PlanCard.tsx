import type { Plan } from "../../../domain/entities/Plan";

interface Props {
  plan: Plan;
  onSelect: () => void;
}

export const PlanCard = ({ plan, onSelect }: Props) => {
  return (
    <article className="c-plan-card">
      {plan.recommended && (
        <span className="c-plan-card__badge">Plan recomendado</span>
      )}

      <h3 className="c-plan-card__title">{plan.name}</h3>

      <p className="c-plan-card__price">
        <span className="c-plan-card__price-main">
          ${plan.price.toFixed(2)} al mes
        </span>
      </p>

      <ul className="c-plan-card__list">
        {plan.description.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <button className="c-btn c-btn--primary" onClick={onSelect}>
        Seleccionar plan
      </button>
    </article>
  );
};
