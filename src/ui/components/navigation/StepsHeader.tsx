import React from "react";
import iconButtonBack from "../../../assets/icons/iconButtonBack.svg";

type Step = {
  id: number;
  label: string;
};

interface StepsHeaderProps {
  steps: Step[];
  currentStepId: number;
  onBack?: () => void;
}

export const StepsHeader: React.FC<StepsHeaderProps> = ({
  steps,
  currentStepId,
  onBack,
}) => {
  const currentIndex = steps.findIndex((s) => s.id === currentStepId);
  const totalSteps = steps.length;
  const progress = ((currentIndex + 1) / totalSteps) * 100;

  return (
    <div className="c-steps">
      <div className="c-steps__inner">
        {/* DESKTOP */}
        <div className="c-steps__desktop">
          <nav className="c-steps__items" aria-label="Progreso de compra">
            {steps.map((step, index) => {
              const isActive = step.id === currentStepId;
              const isCompleted = step.id < currentStepId;

              return (
                <React.Fragment key={step.id}>
                  <div
                    className={`c-steps__item ${
                      isActive ? "c-steps__item--active" : ""
                    } ${isCompleted ? "c-steps__item--completed" : ""}`}
                  >
                    <span className="c-steps__circle">
                      {step.id}
                    </span>
                    <span className="c-steps__label">{step.label}</span>
                  </div>

                  {index < steps.length - 1 && (
                    <span className="c-steps__dots" aria-hidden="true">
                      • • •
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        </div>

        {/* MOBILE */}
        <div className="c-steps__mobile">
          <div className="c-steps__mobile-top">
            {onBack && (
              <button
                type="button"
                className="c-steps__back-btn"
                onClick={onBack}
              >
                <img src={iconButtonBack} alt="Volver" />
              </button>
            )}

            <span className="c-steps__step-text">
              PASO {currentIndex + 1} DE {totalSteps}
            </span>
          </div>

          <div className="c-steps__bar">
            <div
              className="c-steps__bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
