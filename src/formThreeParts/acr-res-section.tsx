// src/form-three/AcrResultSection.tsx
import React from "react";
import "../FormThree.css"; // adapte ton CSS

interface Props {
  conclusionIA: string;
  conduiteIA: string;
  acrType: string;
  acrScore?: string; // Score ACR dynamique
}

const AcrResultSection: React.FC<Props> = ({ conclusionIA, conduiteIA, acrType, acrScore }) => {
  // ✅ LOGIQUE ORIGINALE : Afficher le type seulement pour ACR 4
  const shouldShowType = acrScore === "4";
  
  console.log("🎯 AcrResultSection - Score ACR:", acrScore, "Type:", acrType); // ✅ DEBUG
  
  // Fonction pour obtenir la couleur du score ACR
  const getAcrScoreColor = (score: string) => {
    switch (score) {
      case "0": return "#10b981"; // Vert pour normal
      case "1": return "#3b82f6"; // Bleu pour probablement bénin
      case "2": return "#f59e0b"; // Orange pour probablement bénin
      case "3": return "#ef4444"; // Rouge pour suspect
      case "4": return "#dc2626"; // Rouge foncé pour très suspect
      case "5": return "#7c2d12"; // Rouge très foncé pour très suspect
      default: return "#6b7280"; // Gris par défaut
    }
  };

  // Fonction pour obtenir l'icône du score ACR
  const getAcrScoreIcon = (score: string) => {
    switch (score) {
      case "0": return "✅";
      case "1": return "🟢";
      case "2": return "🟡";
      case "3": return "🟠";
      case "4": return "🔴";
      case "5": return "⛔";
      default: return "❓";
    }
  };

  // Fonction pour obtenir l'icône de la conduite
  const getConduiteIcon = (conduite: string) => {
    if (conduite.toLowerCase().includes("surveillance")) return "👁️";
    if (conduite.toLowerCase().includes("biopsie")) return "🔬";
    if (conduite.toLowerCase().includes("ablation")) return "⚕️";
    if (conduite.toLowerCase().includes("traitement")) return "💊";
    return "📋";
  };
  
  return (
    <div className="acr-result-section">
      <div className="acr-header">
        <div className="acr-header-icon">🎯</div>
        <h2 className="acr-title">Résultat ACR</h2>
      </div>

      <div className="acr-result">
        {acrScore ? (
          <div className="acr-score-display">
            <div className="acr-score-main">
              <div className="acr-score-icon" style={{ backgroundColor: getAcrScoreColor(acrScore) }}>
                {getAcrScoreIcon(acrScore)}
              </div>
              <div className="acr-score-info">
                <span className="acr-label">Score ACR</span>
                <span className="acr-value" style={{ color: getAcrScoreColor(acrScore) }}>
                  {acrScore}
                </span>
              </div>
            </div>
            
            {/* ✅ Afficher le type seulement pour ACR 4 */}
            {shouldShowType && acrType && (
              <div className="acr-type-badge">
                <span className="acr-type-label">Type</span>
                <span className="acr-type-value">{acrType}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="acr-loading">
            <div className="loading-spinner"></div>
            <p className="loading-text">Score ACR en cours de calcul...</p>
          </div>
        )}
      </div>

      <div className="conduite-section">
        <div className="conduite-header">
          <div className="conduite-header-icon">⚡</div>
          <h2 className="conduite-title">Action Recommandée</h2>
        </div>

        <div className="conduite-result">
          {conduiteIA ? (
            <div className="conduite-content">
              <div className="conduite-icon">
                {getConduiteIcon(conduiteIA)}
              </div>
              <div className="conduite-text">
                <p>{conduiteIA}</p>
              </div>
            </div>
          ) : (
            <div className="conduite-empty">
              <div className="conduite-empty-icon">📝</div>
              <p className="conduite-empty-text">Aucune action recommandée pour le moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcrResultSection;
