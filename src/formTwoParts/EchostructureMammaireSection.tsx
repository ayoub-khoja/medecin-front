import React from "react";

interface Props {
  echostructureMammaire: string;
  handleEchostructureChange: (value: string) => void;
}

const EchostructureMammaireSection: React.FC<Props> = ({ 
  echostructureMammaire, 
  handleEchostructureChange 
}) => {
  return (
    <div className="additional-section border rounded-lg mt-4 p-4">
      <label className="form-label">
        Échostructure mammaire 
        <span className="text-red-500 ml-1">*</span>
      </label>
      <div className="form-radio-section mt-2">
        {["graisseuse homogène", "fibroglandulaire homogène", "hétérogène"].map((option) => (
          <label key={option} className="radio-label">
            <input
              type="radio"
              name="echostructure"
              value={option}
              checked={echostructureMammaire === option}
              onChange={(e) => handleEchostructureChange(e.target.value)}
              required
            />
            {option}
          </label>
        ))}
      </div>
      {!echostructureMammaire && (
        <p className="text-red-600 text-sm mt-2">
          ⚠️ Veuillez sélectionner l'échostructure mammaire
        </p>
      )}
      {echostructureMammaire && (
        <p className="text-green-600 text-sm mt-2">
          ✅ Échostructure sélectionnée : {echostructureMammaire}
        </p>
      )}
    </div>
  );
};

export default EchostructureMammaireSection;