import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PatientManagement.css';
import { useAuth } from './hooks/useAuth';
import { ROUTES } from './navigation/navigationConfig';

interface Patient {
  id: string;
  nom: string;
  prenom: string;
  acr: string;
  type: string;
}

const PatientManagement: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatients, setSelectedPatients] = useState<string[]>([]);

  // Données de démonstration des patients
  const [patients] = useState<Patient[]>([
    { id: '1', nom: 'Ayoub Ramez', prenom: 'Khouja', acr: '4', type: 'A' },
    { id: '2', nom: 'Seif', prenom: 'Khouja', acr: '5', type: '-' },
    { id: '3', nom: 'Dhia', prenom: 'Khouja', acr: '2', type: '-' },
    { id: '4', nom: 'Yosri', prenom: 'Khouja', acr: '3', type: '-' },
    { id: '5', nom: 'Dhia', prenom: 'Harchey', acr: '5', type: '-' },
    { id: '6', nom: 'Ali', prenom: 'Ben Nejma', acr: '1', type: '-' },
  ]);

  const handleNouveauPatient = () => {
    navigate(ROUTES.FORM_ONE);
  };

  const handleViewPatient = (patientId: string) => {
    console.log('Voir le patient:', patientId);
    // Navigation vers la page de détails du patient
  };

  const handleDeletePatient = (patientId: string) => {
    console.log('Supprimer le patient:', patientId);
    // Logique de suppression du patient
  };

  const handleSelectPatient = (patientId: string) => {
    setSelectedPatients(prev => 
      prev.includes(patientId) 
        ? prev.filter(id => id !== patientId)
        : [...prev, patientId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPatients.length === patients.length) {
      setSelectedPatients([]);
    } else {
      setSelectedPatients(patients.map(p => p.id));
    }
  };

  const filteredPatients = patients.filter(patient =>
    `${patient.nom} ${patient.prenom}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="patient-management-container">
      {/* Header avec logo */}
      <header className="pm-header">
        <div className="header-left">
          <div className="logo-container">
            <div className="logo-icon">🎗️</div>
            <h1 className="logo-text">Cancer IA !</h1>
          </div>
        </div>
        
        <div className="header-right">
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            Déconnexion
          </button>
        </div>
      </header>

      {/* Bannière de gestion des patients */}
      <div className="pm-banner">
        <div className="banner-content">
          <h2 className="banner-title">Gestion des patients</h2>
          <div className="banner-ribbon">🎗️</div>
        </div>
      </div>

      {/* Section principale */}
      <main className="pm-main">
        <div className="pm-content">
          {/* En-tête de la liste */}
          <div className="list-header">
            <h3 className="list-title">Liste des patients</h3>
            
            <div className="list-controls">
              <div className="search-container">
                <i className="fas fa-search search-icon"></i>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Tout rechercher par nom"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button className="create-patient-btn" onClick={handleNouveauPatient}>
                <i className="fas fa-plus"></i>
                Créer un patient
              </button>
            </div>
          </div>

          {/* Tableau des patients */}
          <div className="patients-table">
            <div className="table-header">
              <div className="header-checkbox">
                <input
                  type="checkbox"
                  checked={selectedPatients.length === patients.length}
                  onChange={handleSelectAll}
                />
              </div>
              <div className="header-name">Nom et Prénom</div>
              <div className="header-acr">ACR</div>
              <div className="header-type">Type</div>
              <div className="header-actions">Actions</div>
            </div>

            <div className="table-body">
              {filteredPatients.map((patient) => (
                <div key={patient.id} className="table-row">
                  <div className="row-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedPatients.includes(patient.id)}
                      onChange={() => handleSelectPatient(patient.id)}
                    />
                  </div>
                  <div className="row-name">
                    {patient.nom} {patient.prenom}
                  </div>
                  <div className="row-acr">{patient.acr}</div>
                  <div className="row-type">{patient.type}</div>
                  <div className="row-actions">
                    <button
                      className="action-btn view-btn"
                      onClick={() => handleViewPatient(patient.id)}
                      title="Voir les détails"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => handleDeletePatient(patient.id)}
                      title="Supprimer"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientManagement; 