import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { RimacLayout } from "../components/layout/RimacLayout";
import { useAppContext } from "../context/AppContext";

import { UserHttpRepository } from "../../infra/repositories/UserHttpRepository";
import { PlanHttpRepository } from "../../infra/repositories/PlanHttpRepository";
import { GetUserUseCase } from "../../domain/usecases/GetUserUseCase";
import { GetPlansForUserUseCase } from "../../domain/usecases/GetPlansForUserUseCase";
import type { Plan } from "../../domain/entities/Plan";

import iconButtonBack from "../../assets/icons/iconButtonBack.svg";
import icAddUserLight from "../../assets/images/plans/IcAddUserLight.png";
import icProtectionLight from "../../assets/images/plans/IcProtectionLight.png";
import { StepsHeader } from "@ui/components/navigation/StepsHeader";
import { PlansCarousel } from "@ui/components/plans/PlansCarousel";

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

        const list = await getPlans.execute();
        setPlans(list);
        setError(null);
      } catch (err) {
        setError("Ocurrió un error al cargar los planes.");
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [userRepo, planRepo, state.user, dispatch]);

  const handleModeChange = (mode: "me" | "other") => {
    dispatch({ type: "SET_QUOTE_MODE", payload: mode });
  };

  const handleSelectPlan = (plan: Plan) => {
    dispatch({ type: "SET_PLAN", payload: plan });
    navigate("/summary");
  };

  // Filtro: 3 primeros "para mí", 3 últimos "para alguien más"
  const filteredPlans = useMemo(() => {
    if (!plans || plans.length === 0) return [];

    if (state.quoteMode === "me") {
      return plans.slice(0, 3);
    }

    return plans.slice(3, 6);
  }, [plans, state.quoteMode]);

  // Texto del título con nombre del usuario
  const userName = state.user?.name;
  const titleText = userName
    ? `${userName} ¿Para quién deseas <br/> cotizar?`
    : "¿Para quién deseas cotizar?";

  const steps = [
    { id: 1, label: "Planes y coberturas" },
    { id: 2, label: "Resumen" },
  ];

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
            <button className="p-plans__back" onClick={() => navigate(-1)}>
              <img
                src={iconButtonBack}
                alt="Volver"
                className="p-plans__back-icon"
              />
              <span>Volver</span>
            </button>

            <h1
              className="p-plans__title"
              dangerouslySetInnerHTML={{ __html: titleText }}
            />

            <p className="p-plans__subtitle">
              Selecciona la opción que se ajuste más a tus necesidades.
            </p>

            <div className="p-plans__modes">
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
