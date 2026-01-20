import axios from 'axios';

const API_BASE_URL = 'http://localhost:9000/api';

export interface Patient {
  id: string;
  nom: string;
  prenom: string;
  acr: string;
  type: string;
  scanId?: number;
  clientId?: number;
  dateCreation?: string;
}

export interface MammaryScanResponse {
  id: number;
  acrScore: string | null;
  acrType: string | null;
  client: {
    id: number;
    nom: string;
    prenom: string;
    renseignementsCliniques?: string;
  };
  conclusionIA?: string;
  conduiteATenir?: string;
}

/**
 * Récupère tous les patients (scans) depuis le backend
 * Chaque scan est affiché comme une ligne dans le tableau
 */
export const getAllPatients = async (): Promise<Patient[]> => {
  try {
    const response = await axios.get<MammaryScanResponse[]>(`${API_BASE_URL}/mammary-scan/all`);
    
    if (!response.data || response.data.length === 0) {
      return [];
    }
    
    // Transformer les données du backend en format Patient
    // Utiliser scanId comme ID unique pour chaque ligne (car un client peut avoir plusieurs scans)
    const patients: Patient[] = response.data.map((scan) => ({
      id: `scan-${scan.id}`, // ID unique basé sur le scan
      nom: scan.client?.nom || 'N/A',
      prenom: scan.client?.prenom || 'N/A',
      acr: scan.acrScore || '-',
      type: scan.acrType || '-',
      scanId: scan.id,
      clientId: scan.client?.id,
      dateCreation: new Date().toISOString(),
    }));

    // Trier par ID de scan décroissant (les plus récents en premier)
    return patients.sort((a, b) => (b.scanId || 0) - (a.scanId || 0));
  } catch (error) {
    console.error('Erreur lors de la récupération des patients:', error);
    throw error;
  }
};

/**
 * Récupère les détails d'un scan par son ID
 */
export const getScanById = async (scanId: number): Promise<MammaryScanResponse> => {
  try {
    const response = await axios.get<MammaryScanResponse>(`${API_BASE_URL}/mammary-scan/${scanId}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du scan:', error);
    throw error;
  }
};

/**
 * Supprime un scan par son ID
 */
export const deleteScan = async (scanId: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/mammary-scan/delete/${scanId}`);
  } catch (error) {
    console.error('Erreur lors de la suppression du scan:', error);
    throw error;
  }
};

/**
 * Récupère tous les scans d'un client spécifique
 */
export const getScansByClientId = async (clientId: number): Promise<MammaryScanResponse[]> => {
  try {
    const allScans = await axios.get<MammaryScanResponse[]>(`${API_BASE_URL}/mammary-scan/all`);
    return allScans.data.filter(scan => scan.client.id === clientId);
  } catch (error) {
    console.error('Erreur lors de la récupération des scans du client:', error);
    throw error;
  }
};
