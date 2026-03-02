import React from "react";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  stepLabels
}) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="progress-indicator">
      <div className="progress-header">
        <div className="progress-icon">🤖</div>
        <h4 className="progress-title">Progression de l'Analyse IA</h4>
      </div>
      
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="progress-percentage">{Math.round(progress)}%</div>
      </div>
      
      <div className="progress-steps">
        {stepLabels.map((label, index) => (
          <div 
            key={index} 
            className={`progress-step ${index <= currentStep ? 'completed' : ''}`}
          >
            <div className="step-marker">
              {index < currentStep ? '✓' : index === currentStep ? '⟳' : index + 1}
            </div>
            <div className="step-label">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;




