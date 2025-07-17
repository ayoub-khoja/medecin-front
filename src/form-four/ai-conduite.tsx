// src/form-four/ai-conduite.tsx
import React from "react";
import "../style/StepFour.css";

interface Props {
  conduiteATenir: string;
}

const ConduiteSection: React.FC<Props> = ({ conduiteATenir }) => {
  return (
    <div className="conduite-section-container">
      <h2 className="conduite-title">Conduite IA</h2>

      <div className="selected-conduite">
        {conduiteATenir ? (
          <p>{conduiteATenir}</p>
        ) : (
          <p className="text-gray-500">Aucune conduite disponible.</p>
        )}
      </div>
    </div>
  );
};

export default ConduiteSection;
