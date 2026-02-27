import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PatientManagement.css';
import { useAuth } from './hooks/useAuth';
import { ROUTES } from './navigation/navigationConfig';
import { getAllPatients, deleteScan, Patient } from './services/patientService';
import { toast } from 'sonner';
import ReturnIcon from './icons/return';

const PatientManagement: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatients, setSelectedPatients] = useState<string[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);

  // Charger les patients depuis le backend
  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      setLoading(true);
      setError(null);
      const patientsData = await getAllPatients();
      setPatients(patientsData);
    } catch (err) {
      console.error('Erreur lors du chargement des patients:', err);
      setError('Erreur lors du chargement des patients. Veuillez réessayer.');
      toast.error('Erreur lors du chargement des patients ❌');
    } finally {
      setLoading(false);
    }
  };

  const handleNouveauPatient = () => {
    navigate(ROUTES.FORM_ONE);
  };

  const handleViewPatient = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    if (patient && patient.scanId) {
      // Navigation vers la page de détails avec le scanId
      navigate(ROUTES.FORM_THREE, { state: { scanId: patient.scanId } });
    } else {
      toast.error('Impossible de trouver les détails du patient ❌');
    }
  };

  const handleDeletePatient = async (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    if (!patient || !patient.scanId) {
      toast.error('Impossible de supprimer ce patient ❌');
      return;
    }

    // Confirmation avant suppression
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer le patient ${patient.nom} ${patient.prenom} ?`)) {
      return;
    }

    try {
      await deleteScan(patient.scanId);
      toast.success('Patient supprimé avec succès ✅');
      // Recharger la liste des patients
      await loadPatients();
      // Retirer de la sélection si sélectionné
      setSelectedPatients(prev => prev.filter(id => id !== patientId));
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      toast.error('Erreur lors de la suppression du patient ❌');
    }
  };

  const handleSelectPatient = (patientId: string) => {
    setSelectedPatients(prev => 
      prev.includes(patientId) 
        ? prev.filter(id => id !== patientId)
        : [...prev, patientId]
    );
  };

  const filteredPatients = patients.filter(patient =>
    `${patient.nom} ${patient.prenom}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculs de pagination
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPatients = filteredPatients.slice(startIndex, endIndex);

  const handleSelectAll = () => {
    const currentPagePatientIds = currentPatients.map(p => p.id);
    const allCurrentSelected = currentPagePatientIds.every(id => selectedPatients.includes(id));
    
    if (allCurrentSelected) {
      // Désélectionner tous les patients de la page actuelle
      setSelectedPatients(prev => prev.filter(id => !currentPagePatientIds.includes(id)));
    } else {
      // Sélectionner tous les patients de la page actuelle
      setSelectedPatients(prev => {
        const newSelection = [...prev];
        currentPagePatientIds.forEach(id => {
          if (!newSelection.includes(id)) {
            newSelection.push(id);
          }
        });
        return newSelection;
      });
    }
  };

  // Réinitialiser la page quand la recherche change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Fonctions de pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
          <button className="banner-return-btn" onClick={() => navigate(ROUTES.DASHBOARD)}>
            <ReturnIcon />
          </button>
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
                  checked={currentPatients.length > 0 && selectedPatients.length === currentPatients.length}
                  onChange={handleSelectAll}
                />
              </div>
              <div className="header-name">Nom et Prénom</div>
              <div className="header-acr">ACR</div>
              <div className="header-type">Type</div>
              <div className="header-actions">Actions</div>
            </div>

            <div className="table-body">
              {loading ? (
                <div className="loading-message">
                  <i className="fas fa-spinner fa-spin"></i>
                  Chargement des patients...
                </div>
              ) : error ? (
                <div className="error-message">
                  <i className="fas fa-exclamation-triangle"></i>
                  {error}
                  <button onClick={loadPatients} className="retry-btn">
                    Réessayer
                  </button>
                </div>
              ) : filteredPatients.length === 0 ? (
                <div className="empty-message">
                  <i className="fas fa-inbox"></i>
                  Aucun patient trouvé
                </div>
              ) : (
                currentPatients.map((patient) => (
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
                ))
              )}
            </div>

            {/* Pagination */}
            {!loading && !error && filteredPatients.length > 0 && totalPages > 1 && (
              <div className="pagination-container">
                <div className="pagination-info">
                  Affichage {startIndex + 1}-{Math.min(endIndex, filteredPatients.length)} sur {filteredPatients.length} patients
                </div>
                <div className="pagination-controls">
                  <button
                    className="pagination-btn"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    <i className="fas fa-chevron-left"></i>
                    Précédent
                  </button>
                  
                  <div className="pagination-numbers">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Afficher seulement quelques pages autour de la page actuelle
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 2 && page <= currentPage + 2)
                      ) {
                        return (
                          <button
                            key={page}
                            className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </button>
                        );
                      } else if (
                        page === currentPage - 3 ||
                        page === currentPage + 3
                      ) {
                        return (
                          <span key={page} className="pagination-ellipsis">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>
                  
                  <button
                    className="pagination-btn"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Suivant
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientManagement; 