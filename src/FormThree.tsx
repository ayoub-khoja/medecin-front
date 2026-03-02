import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "./steppper/Stepper";
import ReturnIcon from "./icons/return";
import { useFormThreeLogic } from "./formThreeParts/useFormThreeLogic";
import SubmitButton from "./formThreeParts/SubmitButton";
import AcrResultSection from "./formThreeParts/acr-res-section";
import ConclusionSummary from "./formThreeParts/ConclusionSummary";
import ProgressIndicator from "./formThreeParts/ProgressIndicator";
import MedicalReport from "./formThreeParts/MedicalReport";
import "./FormThree.css";

const FormThree: React.FC = () => {
  const navigate = useNavigate();
  const {
    steps,
    conclusionIA,
    conduiteIA,
    justificationIA, // ✅ NOUVEAU : Justification IA
    acrType,
    acrScore,
    loadingIA,
    handleSubmit,
    // ✅ NOUVEAUX : Données et fonctions pour le compte rendu
    scanData,
    showMedicalReport,
    openMedicalReport,
    closeMedicalReport,
  } = useFormThreeLogic(navigate);

  // État pour simuler la progression de l'analyse IA
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentAnalysisStep, setCurrentAnalysisStep] = useState(0);
  
  const analysisSteps = [
    "Analyse des images",
    "Détection des anomalies",
    "Classification ACR",
    "Génération de la conclusion",
    "Finalisation"
  ];

  // Simulation de la progression pendant le chargement
  useEffect(() => {
    if (loadingIA) {
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.random() * 15;
        });
        
        setCurrentAnalysisStep(prev => {
          if (prev < analysisSteps.length - 1) {
            return Math.floor((analysisProgress / 100) * analysisSteps.length);
          }
          return prev;
        });
      }, 800);

      return () => clearInterval(interval);
    }
  }, [loadingIA, analysisProgress]);

  return (
    <div className="form-wrapper">
      <div className="form-image-section">
        <img 
          src="/image-conclusion.png" 
          alt="Conclusion médicale" 
          className="form-side-image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/med.jpg";
          }}
        />
      </div>
      <div className="form-three-container">
        <div className="form-three-content-section">
          <div className="form-three-header">
            <ReturnIcon onClick={() => navigate(-1)} />
            <Stepper steps={steps} currentStep={2} />
          </div>
        
        <div className="form-three-content">
          <div className="form-three-title-section">
            <div className="title-icon">📊</div>
            <h2 className="form-three-title">Conclusion IA</h2>
            <div className="title-subtitle">Analyse automatique des résultats</div>
          </div>

          {loadingIA ? (
            <div className="loading-container">
              <div className="loading-animation">
                <div className="loading-circle"></div>
                <div className="loading-circle"></div>
                <div className="loading-circle"></div>
              </div>
              <h3 className="loading-title">Analyse IA en cours...</h3>
              <p className="loading-description">
                Notre intelligence artificielle analyse vos résultats pour fournir une conclusion précise.
              </p>
              
              {/* Indicateur de progression */}
              <ProgressIndicator 
                currentStep={currentAnalysisStep}
                totalSteps={analysisSteps.length}
                stepLabels={analysisSteps}
              />
            </div>
          ) : (
            <>
              {/* Résumé de la conclusion */}
              <ConclusionSummary 
                conclusionIA={conclusionIA}
                justificationIA={justificationIA} // ✅ NOUVEAU : Passer la justification
                acrScore={acrScore || ""}
                acrType={acrType}
                scanData={scanData}
              />

              {/* Section ACR et conduite */}
              <AcrResultSection 
                conclusionIA={conclusionIA} 
                conduiteIA={conduiteIA} 
                acrType={acrType}
                acrScore={acrScore}
              />
              
              {/* ✅ NOUVEAU : Bouton pour voir le compte rendu */}
              <div className="medical-report-button-container">
                <button 
                  className="medical-report-button"
                  onClick={openMedicalReport}
                  disabled={!scanData}
                >
                  <span className="button-icon">📋</span>
                  <span className="button-text">Voir le compte rendu médical</span>
                </button>
              </div>
            </>
          )}
        </div>

        <SubmitButton handleSubmit={handleSubmit} />

        {/* ✅ NOUVEAU : Modal du compte rendu médical */}
        {scanData && (
          <MedicalReport
            isOpen={showMedicalReport}
            onClose={closeMedicalReport}
            scanData={scanData}
          />
        )}
        </div>
      </div>
    </div>
  );
};

export default FormThree;
