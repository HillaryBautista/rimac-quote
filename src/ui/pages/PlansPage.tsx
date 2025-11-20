import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { RimacLayout } from "../components/layout/RimacLayout";
import { PlanCard } from "../components/plans/PlanCard";
import { useAppContext } from "../context/AppContext";

import { UserHttpRepository } from "../../infra/repositories/UserHttpRepository";
import { PlanHttpRepository } from "../../infra/repositories/PlanHttpRepository";
import { GetUserUseCase } from "../../domain/usecases/GetUserUseCase";
import { GetPlansForUserUseCase } from "../../domain/usecases/GetPlansForUserUseCase";
import type { Plan } from "../../domain/entities/Plan";

export const PlansPage = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [error, setError] = useState<string | null>(null);

  const userRepo = useMemo(() => new UserHttpRepository(), []);
  const planRepo = useMemo(() => new PlanHttpRepository(), []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getUser = new GetUserUseCase(userRepo);
        const getPlans = new GetPlansForUserUseCase(planRepo);

        let user = state.user;

        if (!user) {
          user = await getUser.execute();
          dispatch({ type: "SET_USER", payload: user });
        }

        const list = await getPlans.execute({
          age: user.age,
          forSomeoneElse: state.quoteMode === "other",
        });

        setPlans(list);
        setError(null);
      } catch (err) {
        setError("Ocurrió un error al cargar los planes.");
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [userRepo, planRepo, state.quoteMode, state.user, dispatch]);

  const handleModeChange = (mode: "me" | "other") => {
    dispatch({ type: "SET_QUOTE_MODE", payload: mode });
  };

  const handleSelectPlan = (plan: Plan) => {
    dispatch({ type: "SET_PLAN", payload: plan });
    navigate("/summary");
  };

  return (
    <RimacLayout>
      <section className="p-plans">
        <header className="p-plans__header">
          <button className="p-plans__back" onClick={() => navigate(-1)}>
            &lt; Volver
          </button>

          <h1 className="p-plans__title">¿Para quién deseas cotizar?</h1>
          <p className="p-plans__subtitle">
            Selecciona la opción que se ajuste más a tus necesidades.
          </p>

          <div className="p-plans__modes">
            <button
              className={`p-plans__mode-card ${
                state.quoteMode === "me" ? "p-plans__mode-card--active" : ""
              }`}
              onClick={() => handleModeChange("me")}
            >
              <span className="p-plans__mode-title">Para mí</span>
              <span className="p-plans__mode-text">
                Cotiza tu seguro de salud y agrega familiares si lo deseas.
              </span>
            </button>

            <button
              className={`p-plans__mode-card ${
                state.quoteMode === "other" ? "p-plans__mode-card--active" : ""
              }`}
              onClick={() => handleModeChange("other")}
            >
              <span className="p-plans__mode-title">Para alguien más</span>
              <span className="p-plans__mode-text">
                Realiza una cotización para uno de tus familiares o cualquier
                persona.
              </span>
            </button>
          </div>
        </header>

        <section className="p-plans__list">
          {loading && <p>Cargando planes...</p>}
          {error && <p className="p-plans__error">{error}</p>}

          {!loading && !error && (
            <div className="p-plans__grid">
              {plans.map((plan, idx) => (
                <PlanCard
                  key={plan.name + idx}
                  plan={plan}
                  onSelect={() => handleSelectPlan(plan)}
                />
              ))}
            </div>
          )}
        </section>
      </section>
    </RimacLayout>
  );
};
