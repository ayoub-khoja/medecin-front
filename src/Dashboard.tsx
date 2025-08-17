import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { useAuth } from './hooks/useAuth';
import { ROUTES } from './navigation/navigationConfig';


const Dashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleNouveauPatient = () => {
    // Si déjà sélectionnée, on désélectionne, sinon on sélectionne
    setSelectedCard(selectedCard === 'nouveau' ? null : 'nouveau');
  };

  const handleHistorique = () => {
    // Si déjà sélectionnée, on désélectionne, sinon on sélectionne
    setSelectedCard(selectedCard === 'historique' ? null : 'historique');
  };

  const handleSuivant = () => {
    // Navigation seulement si une carte est sélectionnée
    if (selectedCard === 'nouveau') {
      navigate(ROUTES.ADD_PATIENT);
    } else if (selectedCard === 'historique') {
      navigate(ROUTES.PATIENT_HISTORY);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard-container">
      {/* Header avec logos */}
      <header className="dashboard-header">
        <div className="header-left">
          <img src="/logo.png" alt="Logo CANCER IA" className="header-logo" />
        </div>
        
        <div className="header-center">
          <h1 className="main-title">
            <span className="title-cancer">CANCER</span>
            <span className="title-ia">IA</span>
          </h1>
          <div className="title-underline">
            <div className="underline-cancer"></div>
            <div className="underline-ia"></div>
          </div>
        </div>
        
        <div className="header-right">
          <img src="/drapeau.avif" alt="Drapeau Tunisie" className="header-drapeau" />
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            Déconnexion
          </button>
        </div>
      </header>

      {/* Message de bienvenue */}
      <div className="welcome-section">
        <h2 className="welcome-title">Bienvenue sur Cancer IA !</h2>
      </div>

      {/* Cartes principales */}
      <main className="dashboard-main">
        <div className="cards-container">
          {/* Carte 1: Nouveau patient */}
          <div 
            className={`dashboard-card ${selectedCard === 'nouveau' ? 'selected' : ''}`} 
            onClick={handleNouveauPatient}
          >
            <div className="card-image">
              <img 
                src="/choix2.png" 
                alt="Docteur analysant un patient" 
                className="card-img"
              />
            </div>
            <div className="card-content">
              <p className="card-text">
                Ajouter un nouveau patient et effectuer l'analyse
              </p>
            </div>
          </div>

          {/* Carte 2: Historique */}
          <div 
            className={`dashboard-card ${selectedCard === 'historique' ? 'selected' : ''}`} 
            onClick={handleHistorique}
          >
            <div className="card-image">
              <img 
                src="/choix1.png" 
                alt="Docteur examinant des radiographies" 
                className="card-img"
              />
            </div>
            <div className="card-content">
              <p className="card-text">
                Accéder à l'historique des patients
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Bouton Suivant */}
      <footer className="dashboard-footer">
        <button 
          className={`suivant-btn ${!selectedCard ? 'disabled' : ''}`} 
          onClick={handleSuivant}
          disabled={!selectedCard}
        >
          Suivant
        </button>
      </footer>
    </div>
  );
};

export default Dashboard; 