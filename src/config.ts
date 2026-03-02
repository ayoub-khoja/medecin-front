// URL de l'API backend - configurée via variable d'environnement Vite
// En dev : http://localhost:9000 (par défaut)
// En prod : l'URL Render du backend
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:9000";
