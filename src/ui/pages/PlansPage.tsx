import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { RimacLayout } from "../components/layout/RimacLayout";
import { useAppContext } from "../context/AppContext";

import { UserHttpRepository } from "../../infra/repositories/UserHttpRepository";
import { PlanHttpRepository } from "../../infra/repositories/PlanHttpRepository";
import { GetUserUseCase } from "../../domain/usecases/GetUserUseCase";
import { GetPlansForUserUseCase } from "../../domain/usecases/GetPlansForUserUseCase";
import type { Plan } from "../../domain/entities/Plan";

import iconButtonBack from "@assets/icons/iconButtonBack.svg";
import icAddUserLight from "@assets/images/plans/IcAddUserLight.png";
import icProtectionLight from "@assets/images/plans/IcProtectionLight.png";
import { StepsHeader } from "@ui/components/navigation/StepsHeader";
import { PlansCarousel } from "@ui/components/plans/PlansCarousel";
import { QUOTE_STEPS } from "@ui/navigation/quoteSteps";

export const PlansPage = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Repositorios HTTP (infra) memorizados para no recrearlos en cada render
  const userRepo = useMemo(() => new UserHttpRepository(), []);
  const planRepo = useMemo(() => new PlanHttpRepository(), []);

  // Refs para evitar que, en modo estricto de React 18, se dupliquen las llamadas
  const hasFetchedUserRef = useRef(false);
  const hasFetchedPlansRef = useRef(false);

  /** 1) Cargar usuario solo si no existe en el contexto */
  useEffect(() => {
    const loadUser = async () => {
      // Si ya se hizo el fetch (StrictMode) o ya hay usuario, no volvemos a llamar al endpoint
      if (hasFetchedUserRef.current || state.user) return;
      hasFetchedUserRef.current = true;

      const getUser = new GetUserUseCase(userRepo);
      const user = await getUser.execute();
      dispatch({ type: "SET_USER", payload: user });
    };

    void loadUser();
  }, [state.user, userRepo, dispatch]);

  /** 2) Cargar planes (solo una vez) */
  useEffect(() => {
    const loadPlans = async () => {
      // Protección frente al doble montaje de StrictMode
      if (hasFetchedPlansRef.current) return;
      hasFetchedPlansRef.current = true;

      try {
        const getPlans = new GetPlansForUserUseCase(planRepo);
        const list = await getPlans.execute();
        setPlans(list);
        setError(null);
      } catch (err) {
        setError("Ocurrió un error al cargar los planes.");
      } finally {
        setLoading(false);
      }
    };

    void loadPlans();
  }, [planRepo]);

  /** 3) Cambiar modo de cotización (para mí / para alguien más) */
  const handleModeChange = (mode: "me" | "other") => {
    dispatch({ type: "SET_QUOTE_MODE", payload: mode });
  };

  /** 4) Seleccionar plan y navegar al resumen */
  const handleSelectPlan = (plan: Plan) => {
    dispatch({ type: "SET_PLAN", payload: plan });
    navigate("/summary");
  };

  /**
   * 5) Filtro de planes según modo:
   *    - "me"    → primeros 3
   *    - "other" → últimos 3
   */
  const filteredPlans = useMemo(() => {
    if (!plans || plans.length === 0) return [];

    if (state.quoteMode === "me") {
      return plans.slice(0, 3);
    }

    return plans.slice(3, 6);
  }, [plans, state.quoteMode]);

  /** 6) Texto del título con el nombre del usuario (Rocío) si está en contexto */
  const userName = state.user?.name;
  const titleText = userName
    ? `${userName} ¿Para quién deseas <br/> cotizar?`
    : "¿Para quién deseas cotizar?";

  const steps = QUOTE_STEPS;

  return (
    <RimacLayout>
      <section className="w-full">
        <StepsHeader
          steps={steps}
          currentStepId={1}
          onBack={() => navigate(-1)}
        />

        <section className="p-plans">
          <header className="p-plans__header">
            {/* Botón volver */}
            <button className="p-plans__back" onClick={() => navigate(-1)}>
              <img
                src={iconButtonBack}
                alt="Volver"
                className="p-plans__back-icon"
              />
              <span>Volver</span>
            </button>

            {/* Título con nombre dinámico */}
            <h1
              className="p-plans__title"
              dangerouslySetInnerHTML={{ __html: titleText }}
            />

            <p className="p-plans__subtitle">
              Selecciona la opción que se ajuste más a tus necesidades.
            </p>

            {/* Cards de modo de cotización */}
            <div className="p-plans__modes">
              {/* Para mí */}
              <button
                className={`p-plans__mode-card ${
                  state.quoteMode === "me" ? "p-plans__mode-card--active" : ""
                }`}
                onClick={() => handleModeChange("me")}
                type="button"
              >
                <div className="p-plans__mode-icon">
                  <img src={icProtectionLight} alt="Para mí" />
                  <span className="p-plans__mode-title">Para mí</span>
                </div>

                <div className="p-plans__mode-body">
                  <span className="p-plans__mode-title">Para mí</span>
                  <span className="p-plans__mode-text">
                    Cotiza tu seguro de salud y agrega familiares si así lo
                    deseas.
                  </span>
                </div>

                <span className="p-plans__mode-radio" aria-hidden="true" />
              </button>

              {/* Para alguien más */}
              <button
                className={`p-plans__mode-card ${
                  state.quoteMode === "other"
                    ? "p-plans__mode-card--active"
                    : ""
                }`}
                onClick={() => handleModeChange("other")}
                type="button"
              >
                <div className="p-plans__mode-icon">
                  <img src={icAddUserLight} alt="Para alguien más" />
                  <span className="p-plans__mode-title">Para alguien más</span>
                </div>

                <div className="p-plans__mode-body">
                  <span className="p-plans__mode-title">Para alguien más</span>
                  <span className="p-plans__mode-text">
                    Realiza una cotización para uno de tus familiares o
                    cualquier persona.
                  </span>
                </div>

                <span className="p-plans__mode-radio" aria-hidden="true" />
              </button>
            </div>
          </header>

          {/* Listado / carrusel de planes */}
          <section className="p-plans__list">
            {loading && <p>Cargando planes...</p>}
            {error && <p className="p-plans__error">{error}</p>}

            {!loading && !error && (
              <PlansCarousel plans={filteredPlans} onSelect={handleSelectPlan} />
            )}
          </section>
        </section>
      </section>
    </RimacLayout>
  );
};
