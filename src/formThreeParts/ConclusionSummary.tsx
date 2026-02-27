import React from "react";

interface ConclusionSummaryProps {
  conclusionIA: string;
  justificationIA?: string; // ✅ NOUVEAU : Justification IA
  acrScore: string;
  acrType?: string;
  scanData?: any;
}

const ConclusionSummary: React.FC<ConclusionSummaryProps> = ({
  conclusionIA,
  justificationIA, // ✅ NOUVEAU : Justification IA
  acrScore,
  acrType,
  scanData
}) => {
  // Fonction pour obtenir le niveau de risque basé sur le score ACR
  const getRiskLevel = (score: string) => {
    switch (score) {
      case "0": return { level: "Normal", color: "#10b981", icon: "✅", description: "Aucune anomalie détectée" };
      case "1": return { level: "Probablement bénin", color: "#3b82f6", icon: "🟢", description: "Très faible probabilité de malignité" };
      case "2": return { level: "Probablement bénin", color: "#f59e0b", icon: "🟡", description: "Faible probabilité de malignité" };
      case "3": return { level: "Suspect", color: "#ef4444", icon: "🟠", description: "Probabilité intermédiaire de malignité" };
      case "4": return { level: "Très suspect", color: "#dc2626", icon: "🔴", description: "Haute probabilité de malignité" };
      case "5": return { level: "Très suspect", color: "#7c2d12", icon: "⛔", description: "Très haute probabilité de malignité" };
      default: return { level: "Non défini", color: "#6b7280", icon: "❓", description: "Score non disponible" };
    }
  };

  const riskInfo = getRiskLevel(acrScore);

  return (
    <div className="conclusion-summary">
      <div className="summary-header">
        <div className="summary-header-icon">📋</div>
        <h3 className="summary-title">Résumé de la Conclusion</h3>
      </div>

      <div className="summary-grid">
        {/* Score ACR avec indicateur de risque */}
        <div className="summary-card risk-card">
          <div className="card-header">
            <div className="card-icon" style={{ backgroundColor: riskInfo.color }}>
              {riskInfo.icon}
            </div>
            <div className="card-title">Niveau de Risque</div>
          </div>
          <div className="card-content">
            <div className="risk-level" style={{ color: riskInfo.color }}>
              {riskInfo.level}
            </div>
            <div className="risk-description">{riskInfo.description}</div>
            <div className="acr-score-display">
              <span className="acr-label">Score ACR:</span>
              <span className="acr-score" style={{ color: riskInfo.color }}>
                {acrScore}
              </span>
            </div>
          </div>
        </div>

        {/* Type ACR si disponible */}
        {acrType && acrScore === "4" && (
          <div className="summary-card type-card">
            <div className="card-header">
              <div className="card-icon" style={{ backgroundColor: "#f59e0b" }}>
                🔍
              </div>
              <div className="card-title">Type de Lésion</div>
            </div>
            <div className="card-content">
              <div className="type-value">{acrType}</div>
              <div className="type-description">
                Classification spécifique de la lésion détectée
              </div>
            </div>
          </div>
        )}

        {/* Informations du patient si disponibles */}
        {scanData?.clientInfo && (
          <div className="summary-card patient-card">
            <div className="card-header">
              <div className="card-icon" style={{ backgroundColor: "#3b82f6" }}>
                👤
              </div>
              <div className="card-title">Patient</div>
            </div>
            <div className="card-content">
              <div className="patient-name">
                {scanData.clientInfo.nom} {scanData.clientInfo.prenom}
              </div>
              <div className="patient-info">
                ID: {scanData.scanId}
              </div>
            </div>
          </div>
        )}

        {/* Statistiques des examens */}
        {scanData && (
          <div className="summary-card stats-card">
            <div className="card-header">
              <div className="card-icon" style={{ backgroundColor: "#059669" }}>
                📊
              </div>
              <div className="card-title">Résultats d'Examens</div>
            </div>
            <div className="card-content">
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">Mammographie</span>
                  <span className="stat-value">{scanData.mammographie?.masses?.length || 0} masse(s)</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Échographie</span>
                  <span className="stat-value">{scanData.echographie?.masses?.length || 0} masse(s)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Justification du score ACR */}
      {justificationIA && (
        <div className="conclusion-detail justification-section">
          <div className="detail-header">
            <div className="detail-icon">🔍</div>
            <h4 className="detail-title">Pourquoi ce résultat ?</h4>
          </div>
          <div className="detail-content justification-content">
            <p className="justification-text">{justificationIA}</p>
          </div>
        </div>
      )}

      {/* Conclusion détaillée */}
      {conclusionIA && (
        <div className="conclusion-detail">
          <div className="detail-header">
            <div className="detail-icon">💡</div>
            <h4 className="detail-title">Conclusion Détaillée</h4>
          </div>
          <div className="detail-content">
            <p>{conclusionIA}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConclusionSummary;




