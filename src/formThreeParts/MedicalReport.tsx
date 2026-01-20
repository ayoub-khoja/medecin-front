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
        distanceCentre?: string;
        sein?: string;
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
        distanceCentre?: string;
        sein?: string;
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
    const now = new Date();
    return now.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="medical-report-overlay">
      <div className="medical-report-modal">
        <div className="medical-report-header">
          <h2>COMPTE-RENDU MAMMOGRAPHIQUE</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="medical-report-content">
          {/* En-tête du rapport avec design JFR/SIAD exact */}
          <div className="report-header">
            <div className="header-left">
              <div className="logo-section">
                <div className="logo">JFR</div>
                <div className="logo-year">2014</div>
                <div className="institution">
                  <span>Diagnostique & Interventionnelle</span>
                </div>
              </div>
            </div>
            <div className="header-center">
              <h1>COMPTE-RENDU: MAMMOGRAPHIE</h1>
            </div>
            <div className="header-right">
              <div className="logo-section">
                <div className="logo-siad">SIAD</div>
                <div className="institution">
                  <span>Société d'Imagerie Mammaire</span>
                </div>
              </div>
            </div>
          </div>

          {/* Informations médecin et institution exactes */}
          <div className="doctor-affiliation">
            <h3>MOHAMED SEIF KHOUJA</h3>
            <p>Centre de Diagnostic Mammographique, Tunis</p>
          </div>

          {/* Renseignements cliniques avec fond vert exact */}
          {scanData.clientInfo?.renseignementsCliniques && (
            <div className="clinical-info-section">
              <h3>Renseignements cliniques:</h3>
              <div className="clinical-details">
                <ul>
                  <li>✓ {scanData.clientInfo.renseignementsCliniques}</li>
                </ul>
              </div>
            </div>
          )}

          {/* Section RÉSULTATS avec barre bleue exacte */}
          <div className="results-section">
            <div className="results-header">
              <h3>RESULTATS</h3>
            </div>
            
            <div className="results-content">
              {/* Sous-section 1: Densitométrie */}
              <div className="result-subsection">
                <h4>1/ Densitométrie mammaire</h4>
                <div className="result-item">
                  <p>✓ Densité mammaire: <strong>{scanData.mammographie?.densiteMammaire || 'À évaluer'}</strong></p>
                </div>
              </div>

              {/* Sous-section 2: Masses */}
              <div className="result-subsection">
                <h4>2/ Masses détectées</h4>
                {(scanData.mammographie?.masses || scanData.echographie?.masses) && 
                 (scanData.mammographie?.masses?.length > 0 || scanData.echographie?.masses?.length > 0) ? (
                  <div className="result-item">
                    <p>✓ Nombre de masses: <strong>{(scanData.mammographie?.masses?.length || 0) + (scanData.echographie?.masses?.length || 0)}</strong></p>
                    <div className="masses-details">
                      {(scanData.mammographie?.masses || []).concat(scanData.echographie?.masses || []).map((masse, index) => (
                        <div key={index} className="masse-detail">
                          <p>✓ Masse {index + 1}: {masse.localisation} - {masse.sein || 'Sein'} - {masse.distanceCentre || '0'}mm du centre</p>
                          <p>✓ Forme: {masse.forme} | Contours: {masse.contours} | Densité: {masse.densite}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="result-item">
                    <p>✓ Aucune masse détectée</p>
                  </div>
                )}
              </div>

              {/* Sous-section 3: Asymétrie */}
              <div className="result-subsection">
                <h4>3/ Asymétrie mammaire</h4>
                <div className="result-item">
                  <p>✓ Présence: <strong>{scanData.mammographie?.asymetrie ? 'Oui' : 'Non'}</strong></p>
                  {scanData.mammographie?.asymetrie && (
                    <p>✓ Type: <strong>{scanData.mammographie.typeAsymetrie}</strong></p>
                  )}
                </div>
              </div>

              {/* Sous-section 4: Distorsion architecturale */}
              <div className="result-subsection">
                <h4>4/ Distorsion architecturale</h4>
                <div className="result-item">
                  <p>✓ Présence: <strong>{scanData.mammographie?.distorsionArchitecturale ? 'Oui' : 'Non'}</strong></p>
                </div>
              </div>

              {/* Sous-section 5: Calcifications */}
              <div className="result-subsection">
                <h4>5/ Calcifications</h4>
                <div className="result-item">
                  <p>✓ Présence: <strong>{scanData.mammographie?.calcifications ? 'Oui' : 'Non'}</strong></p>
                  {scanData.mammographie?.calcifications && (
                    <p>✓ Type: <strong>{scanData.mammographie.typesCalcifications}</strong></p>
                  )}
                </div>
              </div>

              {/* Sous-section 6: Signes associés */}
              <div className="result-subsection">
                <h4>6/ Signes associés</h4>
                <div className="result-item">
                  {scanData.mammographie?.signesAssocies && scanData.mammographie.signesAssocies.length > 0 ? (
                    <div>
                      {scanData.mammographie.signesAssocies.map((signe, index) => (
                        <p key={index}>✓ {signe}</p>
                      ))}
                    </div>
                  ) : (
                    <p>✓ Aucun signe associé</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section ACR et IA avec barre bleue */}
          {scanData.resultats && (
            <div className="results-section">
              <div className="results-header">
                <h3>CLASSIFICATION ACR & IA</h3>
              </div>
              
              <div className="results-content">
                <div className="result-subsection">
                  <h4>7/ Score ACR</h4>
                  <div className="result-item">
                    <p>✓ Score: <strong>{scanData.resultats.acrScore}</strong></p>
                    {scanData.resultats.acrScore === "4" && scanData.resultats.acrType && (
                      <p>✓ Type: <strong>{scanData.resultats.acrType}</strong></p>
                    )}
                  </div>
                </div>

                <div className="result-subsection">
                  <h4>8/ Conclusion Intelligence Artificielle</h4>
                  <div className="result-item">
                    <p>✓ {scanData.resultats.conclusionIA}</p>
                  </div>
                </div>

                <div className="result-subsection">
                  <h4>9/ Conduite à tenir</h4>
                  <div className="result-item">
                    <p>✓ <strong>{scanData.resultats.conduiteATenir}</strong></p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Schéma de localisation avec design exact */}
          {(scanData.mammographie?.masses || scanData.echographie?.masses) && 
           (scanData.mammographie?.masses?.length > 0 || scanData.echographie?.masses?.length > 0) && (
            <div className="localisation-schema">
              <div className="schema-container">
                <div className="breast-schema-display">
                  <h4>EXEMPLE</h4>
                  <div className="breast-outline">
                    <div className="clock-markers">
                      <span className="marker-12">12H</span>
                      <span className="marker-3">3H</span>
                      <span className="marker-6">6H</span>
                      <span className="marker-9">9H</span>
                    </div>
                    <div className="nipple-center"></div>
                    {/* Points de localisation des masses */}
                    {(scanData.mammographie?.masses || []).concat(scanData.echographie?.masses || []).map((masse, index) => (
                      <div 
                        key={index} 
                        className="mass-location-point"
                        style={{
                          position: 'absolute',
                          width: '12px',
                          height: '12px',
                          backgroundColor: '#ef4444',
                          borderRadius: '50%',
                          border: '2px solid white',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                        }}
                        title={`Masse ${index + 1}: ${masse.localisation} - ${masse.sein} - ${masse.distanceCentre}mm`}
                      />
                    ))}
                  </div>
                  <p className="schema-description">
                    Localisation des masses selon le système d'horloge. 
                    Chaque point rouge représente une masse détectée avec sa position et distance du centre.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Synthèse et conclusion avec barre bleue exacte */}
          <div className="results-section">
            <div className="results-header">
              <h3>SYNTHESE ET CONCLUSION</h3>
            </div>
            
            <div className="results-content">
              <div className="result-item">
                <ul>
                  <li>✓ Résumé des anomalies détectées</li>
                  <li>✓ Classification ACR et recommandations</li>
                  <li>✓ Conduite à tenir proposée</li>
                  <li>✓ Suivi recommandé</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Signature et cachet exacts */}
          <div className="report-signature">
            <div className="signature-section">
              <div className="doctor-info">
                <p><strong>Radiologue responsable :</strong></p>
                <p className="doctor-name">MOHAMED SEIF KHOUJA</p>
                <p className="doctor-title">Médecin Radiologue</p>
                <p className="doctor-credentials">Spécialiste en Imagerie Mammaire</p>
              </div>
              
              <div className="signature-area">
                <div className="signature-line"></div>
                <p className="signature-text">Signature</p>
              </div>
              
              <div className="stamp-area">
                <div className="medical-stamp">
                  <div className="stamp-content">
                    <span className="stamp-text">CACHET</span>
                    <span className="stamp-text">MÉDICAL</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="report-footer">
              <p><strong>Date :</strong> {formatDate()} | <strong>Heure :</strong> {formatTime()}</p>
            </div>
          </div>
        </div>

        <div className="medical-report-footer">
          <button className="print-button" onClick={() => window.print()}>
            🖨️ Imprimer le rapport
          </button>
          <button className="close-button-secondary" onClick={onClose}>
            ✕ Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalReport; 