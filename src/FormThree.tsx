import React from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "./steppper/Stepper";
import ReturnIcon from "./icons/return";
import { useFormThreeLogic } from "./formThreeParts/useFormThreeLogic";
import SubmitButton from "./formThreeParts/SubmitButton";
import "./FormThree.css";
import AcrResultSection from "./formThreeParts/acr-res-section";

const FormThree: React.FC = () => {
  const navigate = useNavigate();
  const {
    steps,
    conclusionIA,
    conduiteIA,
    loadingIA,
    handleSubmit,
  } = useFormThreeLogic(navigate);

  return (
    <div className="form-three-container">
      <ReturnIcon onClick={() => navigate(-1)} />
      <Stepper steps={steps} currentStep={2} />
      <h2 className="form-three-title">Conclusion</h2>

      {loadingIA ? (
        <p>Analyse IA en cours...</p>
      ) : (
        <AcrResultSection conclusionIA={conclusionIA} conduiteIA={conduiteIA} /> // 👉 UTILISATION ICI
      )}

      <SubmitButton handleSubmit={handleSubmit} />
    </div>
  );
};

export default FormThree;
