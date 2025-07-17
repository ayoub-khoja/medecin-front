// src/FormFour.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "./steppper/Stepper";
import ReturnIcon from "./icons/return";
import { useStepFourLogic } from "./form-four/useStepFourLogic";
import ConduiteSection from "./form-four/ai-conduite";
import SubmitButton from "./formThreeParts/SubmitButton";
import "./style/StepFour.css";

const FormFour: React.FC = () => {
  const navigate = useNavigate();
  const { steps, conclusionIA, conduiteATenir, loading, handleSubmit } = useStepFourLogic(navigate);

  if (loading) {
    return (
      <div className="form-four-container">
        <h2 className="form-four-title">Chargement IA...</h2>
      </div>
    );
  }

  return (
    <div className="form-four-container">
      <ReturnIcon onClick={() => navigate(-1)} />
      <Stepper steps={steps} currentStep={3} />
      <h2 className="form-four-title">Résultat IA</h2>

      <div className="conclusion-ia">
        {conclusionIA && (
          <h3>ACR IA : {conclusionIA}</h3>
        )}
      </div>

      <ConduiteSection conduiteATenir={conduiteATenir} />

      <SubmitButton handleSubmit={handleSubmit} />
    </div>
  );
};

export default FormFour;
