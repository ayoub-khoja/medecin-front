// src/stepper/Stepper.tsx
import React from "react";
import "./Stepper.css";

interface Step {
  title: string;
  status: "completed" | "in-progress" | "pending";
  subtitle?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="stepper-container">
      {steps.map((step, index) => (
        <div className="stepper-step" key={index}>
          <div className={`stepper-circle ${step.status} ${index === currentStep ? "current" : ""}`}>
            {step.status === "completed" ? "✔" : index + 1}
          </div>

          {index !== steps.length - 1 && (
            <div
              className={`stepper-line ${
                steps[index + 1].status === "completed" || steps[index + 1].status === "in-progress"
                  ? "active"
                  : ""
              }`}
            />
          )}

          <div className="stepper-labels">
            <div className="step-title">STEP {index + 1}</div>
            <div className="step-heading">{step.title}</div>
            <div className={`step-subtitle ${step.status}`}>
              {step.status === "completed"
                ? "Completed"
                : step.status === "in-progress"
                ? "In Progress"
                : "Pending"}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
