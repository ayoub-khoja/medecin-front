import React from "react";
import "./MedicalReport.css";

interface MedicalReportProps {
  isOpen: boolean;
  onClose: () => void;
  scanData: {
    scanId?: string;
    clientInfo?: {
      nom?: string;
      prenom?: string;
      renseignementsCliniques?: string;
    };
    mammographie?: {
      densiteMammaire?: string;
      masses?: Array<{
        localisation: string;
        forme: string;
        contours: string;
        densite: string;
      }>;
      asymetrie?: boolean;
      typeAsymetrie?: string;
      distorsionArchitecturale?: boolean;
      calcifications?: boolean;
      typesCalcifications?: string;
      signesAssocies?: string[];
    };
    echographie?: {
      echostructureMammaire?: string;
      masses?: Array<{
        localisation: string;
        mesure: string;
        forme: string;
        contours: string;
        densite: string;
        orientation: string;
        comportement: string;
        calcifications: string;
      }>;
      signesAssocies?: string[];
    };
    resultats?: {
      acrScore?: string;
      acrType?: string;
      conclusionIA?: string;
      conduiteATenir?: string;
    };
  };
}

const MedicalReport: React.FC<MedicalReportProps> = ({ isOpen, onClose, scanData }) => {
  if (!isOpen) return null;

  const formatDate = () => {
    return new Date().toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="medical-report-overlay">
      <div className="medical-report-modal">
        <div className="medical-report-header">
          <h2>Compte Rendu Médical</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="medical-report-content">
          {/* En-tête du rapport */}
          <div className="report-header">
            <div className="report-info">
              <p><strong>Date d'examen :</strong> {formatDate()}</p>
              <p><strong>Numéro de scan :</strong> {scanData.scanId || 'N/A'}</p>
            </div>
          </div>

          {/* Informations patient */}
          {scanData.clientInfo && (
            <div className="report-section">
              <h3>Informations Patient</h3>
              <div className="patient-info">
                <p><strong>Nom :</strong> {scanData.clientInfo.nom || 'N/A'}</p>
                <p><strong>Prénom :</strong> {scanData.clientInfo.prenom || 'N/A'}</p>
                {scanData.clientInfo.renseignementsCliniques && (
                  <p><strong>Renseignements cliniques :</strong> {scanData.clientInfo.renseignementsCliniques}</p>
                )}
              </div>
            </div>
          )}

          {/* Résultats mammographie */}
          {scanData.mammographie && (
            <div className="report-section">
              <h3>Résultats Mammographie</h3>
              <div className="mammo-results">
                <p><strong>Densité mammaire :</strong> {scanData.mammographie.densiteMammaire || 'N/A'}</p>
                
                {scanData.mammographie.masses && scanData.mammographie.masses.length > 0 && (
                  <div className="masses-details">
                    <h4>Masses détectées :</h4>
                    {scanData.mammographie.masses.map((masse, index) => (
                      <div key={index} className="masse-item">
                        <p><strong>Masse {index + 1} :</strong></p>
                        <ul>
                          <li>Localisation : {masse.localisation}</li>
                          <li>Forme : {masse.forme}</li>
                          <li>Contours : {masse.contours}</li>
                          <li>Densité : {masse.densite}</li>
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                <p><strong>Asymétrie :</strong> {scanData.mammographie.asymetrie ? 'Oui' : 'Non'}</p>
                {scanData.mammographie.asymetrie && scanData.mammographie.typeAsymetrie && (
                  <p><strong>Type d'asymétrie :</strong> {scanData.mammographie.typeAsymetrie}</p>
                )}
                
                <p><strong>Distorsion architecturale :</strong> {scanData.mammographie.distorsionArchitecturale ? 'Oui' : 'Non'}</p>
                
                <p><strong>Calcifications :</strong> {scanData.mammographie.calcifications ? 'Oui' : 'Non'}</p>
                {scanData.mammographie.calcifications && scanData.mammographie.typesCalcifications && (
                  <p><strong>Types de calcifications :</strong> {scanData.mammographie.typesCalcifications}</p>
                )}

                {scanData.mammographie.signesAssocies && scanData.mammographie.signesAssocies.length > 0 && (
                  <p><strong>Signes associés :</strong> {scanData.mammographie.signesAssocies.join(', ')}</p>
                )}
              </div>
            </div>
          )}

          {/* Résultats échographie */}
          {scanData.echographie && (
            <div className="report-section">
              <h3>Résultats Échographie</h3>
              <div className="echo-results">
                <p><strong>Échostructure mammaire :</strong> {scanData.echographie.echostructureMammaire || 'N/A'}</p>
                
                {scanData.echographie.masses && scanData.echographie.masses.length > 0 && (
                  <div className="masses-details">
                    <h4>Masses échographiques :</h4>
                    {scanData.echographie.masses.map((masse, index) => (
                      <div key={index} className="masse-item">
                        <p><strong>Masse {index + 1} :</strong></p>
                        <ul>
                          <li>Localisation : {masse.localisation}</li>
                          <li>Mesure : {masse.mesure}</li>
                          <li>Forme : {masse.forme}</li>
                          <li>Contours : {masse.contours}</li>
                          <li>Densité : {masse.densite}</li>
                          <li>Orientation : {masse.orientation}</li>
                          <li>Comportement : {masse.comportement}</li>
                          <li>Calcifications : {masse.calcifications}</li>
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {scanData.echographie.signesAssocies && scanData.echographie.signesAssocies.length > 0 && (
                  <p><strong>Signes associés :</strong> {scanData.echographie.signesAssocies.join(', ')}</p>
                )}
              </div>
            </div>
          )}

          {/* Résultats ACR et conclusion */}
          {scanData.resultats && (
            <div className="report-section">
              <h3>Résultats ACR et Conclusion</h3>
              <div className="acr-results">
                <div className="acr-score">
                  <p><strong>Score ACR :</strong> {scanData.resultats.acrScore}</p>
                  {scanData.resultats.acrScore === "4" && scanData.resultats.acrType && (
                    <p><strong>Type ACR :</strong> {scanData.resultats.acrType}</p>
                  )}
                </div>
                
                {scanData.resultats.conclusionIA && (
                  <div className="conclusion-ia">
                    <h4>Conclusion IA :</h4>
                    <p>{scanData.resultats.conclusionIA}</p>
                  </div>
                )}
                
                {scanData.resultats.conduiteATenir && (
                  <div className="conduite-atenir">
                    <h4>Conduite à tenir :</h4>
                    <p>{scanData.resultats.conduiteATenir}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Signature */}
          <div className="report-signature">
            <p><strong>Radiologue responsable :</strong> Dr. [Nom du radiologue]</p>
            <p><strong>Date de signature :</strong> {formatDate()}</p>
          </div>
        </div>

        <div className="medical-report-footer">
          <button className="print-button" onClick={() => window.print()}>
            Imprimer le rapport
          </button>
          <button className="close-button-secondary" onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalReport; 