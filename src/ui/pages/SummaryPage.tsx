import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { RimacLayout } from "../components/layout/RimacLayout";
import { useAppContext } from "../context/AppContext";
import iconButtonBack from "@assets/icons/iconButtonBack.svg";
import iconUser from "@assets/icons/iconUser.svg";
import { StepsHeader } from "@ui/components/navigation/StepsHeader";
import { QUOTE_STEPS } from "@ui/navigation/quoteSteps";

export const SummaryPage = () => {
  const { state } = useAppContext();
  const navigate = useNavigate();

  const { user, selectedPlan } = state;

  useEffect(() => {
    if (!user || !selectedPlan) {
      navigate("/");
    }
  }, [user, selectedPlan, navigate]);

  if (!user || !selectedPlan) return null;

  const steps = QUOTE_STEPS;

  return (
    <RimacLayout>
      <section className="w-full">
        <StepsHeader
          steps={steps}
          currentStepId={2}
          onBack={() => navigate(-1)}
        />
        <section className="p-summary">
          <button className="p-summary__back" onClick={() => navigate(-1)}>
            <img
              src={iconButtonBack}
              alt="Volver"
              className="p-plans__back-icon"
            />
            Volver
          </button>

          <h1 className="p-summary__title">Resumen del seguro</h1>

          <div className="p-summary__card">
            <h2 className="p-summary__card-subtitle">
              Precios calculados para:
            </h2>

            <div className="p-summary__person">
              <img
                src={iconUser}
                alt="user icon"
                className="p-summary__person-icon"
              />
              <span className="p-summary__person-name">{user.name} {user.lastName}</span>
            </div>

            <hr className="p-summary__divider" />

            <div className="p-summary__row">
              <strong className="p-summary__label">Responsable de pago</strong>
            </div>

            <div className="p-summary__row">
              {/* <span className="p-summary__label">DNI</span> */}
              <span className="p-summary__value">DNI: {user.documentNumber}</span>
            </div>

            <div className="p-summary__row">
              {/* <span className="p-summary__label">Celular: </span> */}
              <span className="p-summary__value">Celular: {user.phone}</span>
            </div>

            <div className="p-summary__row">
              <span className="p-summary__label">Plan elegido</span>
              <span className="p-summary__value">{selectedPlan.name}</span>
            </div>

            <div className="p-summary__row">
              {/* <span className="p-summary__label">Costo del Plan:</span> */}
              <span className="p-summary__value">
                Costo del Plan: ${selectedPlan.price.toFixed(2)} al mes
              </span>
            </div>
          </div>
        </section>
      </section>
    </RimacLayout>
  );
};
