import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { RimacLayout } from "../components/layout/RimacLayout";
import { useAppContext } from "../context/AppContext";

export const SummaryPage = () => {
  const { state } = useAppContext();
  const navigate = useNavigate();

  const { user, selectedPlan } = state;

  useEffect(() => {
    // Si no hay datos, redireccionamos al inicio
    if (!user || !selectedPlan) {
      navigate("/");
    }
  }, [user, selectedPlan, navigate]);

  if (!user || !selectedPlan) {
    return null;
  }

  return (
    <RimacLayout>
      <section className="p-summary">
        <button className="p-summary__back" onClick={() => navigate(-1)}>
          &lt; Volver
        </button>

        <h1 className="p-summary__title">Resumen del seguro</h1>

        <div className="p-summary__card">
          <h2 className="p-summary__card-title">Precios calculados para:</h2>
          <p className="p-summary__name">{user.name}</p>

          <div className="p-summary__row">
            <span className="p-summary__label">Responsable de pago</span>
            <span className="p-summary__value">{user.name}</span>
          </div>

          <div className="p-summary__row">
            <span className="p-summary__label">DNI</span>
            <span className="p-summary__value">{user.dni}</span>
          </div>

          <div className="p-summary__row">
            <span className="p-summary__label">Celular</span>
            <span className="p-summary__value">{user.phone}</span>
          </div>

          <div className="p-summary__row">
            <span className="p-summary__label">Plan elegido</span>
            <span className="p-summary__value">{selectedPlan.name}</span>
          </div>

          <div className="p-summary__row">
            <span className="p-summary__label">Costo del plan</span>
            <span className="p-summary__value">
              ${selectedPlan.price.toFixed(2)} al mes
            </span>
          </div>
        </div>
      </section>
    </RimacLayout>
  );
};
