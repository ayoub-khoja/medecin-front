import React from "react";

interface Props {
  echostructureMammaire: string; // Retirer le type null
  handleEchostructureChange: (value: string) => void;
}

const EchostructureMammaireSection: React.FC<Props> = ({ 
  echostructureMammaire, 
  handleEchostructureChange 
}) => {
  const options = [
    "graisseuse homogène",
    "fibroglandulaire homogène",
    "hétérogène",
  ];
  return (
    <div className="echostructure-section">
      <p className="form-two-subtitle">Echostructure mammaire</p>
      <div className="echostructure-options">
        {options.map((option) => (
          <label key={option} className="radio-label"> {/* Changé en radio-label */}
            <input
              type="radio"
              name="echostructureMammaire"
              value={option}
              checked={echostructureMammaire === option}
              onChange={() => handleEchostructureChange(option)}
              className="radio-input"
            />
            <span className="radio-custom"></span>
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default EchostructureMammaireSection;