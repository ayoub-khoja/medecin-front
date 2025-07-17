// src/form-three/AcrResultSection.tsx
import React from "react";
import "../FormThree.css"; // adapte ton CSS

interface Props {
  conclusionIA: string;
  conduiteIA: string;
}

const AcrResultSection: React.FC<Props> = ({ conclusionIA, conduiteIA }) => {
  return (
    <div className="acr-result-section">
      <h2 className="acr-title">Résultat ACR</h2>

      <div className="acr-result">
        {conclusionIA ? (
          <p><strong>{conclusionIA}</strong></p>
        ) : (
          <p className="text-gray-500">Aucune conclusion disponible.</p>
        )}
      </div>

      <h2 className="conduite-title">Action Recommandée</h2>

      <div className="conduite-result">
        {conduiteIA ? (
          <p>{conduiteIA}</p>
        ) : (
          <p className="text-gray-500">Aucune action recommandée.</p>
        )}
      </div>
    </div>
  );
};

export default AcrResultSection;
