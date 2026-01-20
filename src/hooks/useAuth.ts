import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  nom: string;
  // Ajoutez d'autres propriétés selon votre API
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté (par exemple, token dans localStorage)
    const token = localStorage.getItem('authToken');
    if (token) {
      // Ici vous pouvez vérifier la validité du token avec votre API
      setIsAuthenticated(true);
      // Récupérer les informations de l'utilisateur si nécessaire
    }
    setLoading(false);
  }, []);

  const login = async (nom: string, password: string) => {
    try {
      const response = await fetch("http://localhost:9000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nom, password }),
      });

      if (!response.ok) {
        throw new Error("Nom ou mot de passe incorrect !");
      }

      const data = await response.json();
      
      // Stocker le token et les informations utilisateur
      localStorage.setItem('authToken', data.token || 'dummy-token');
      localStorage.setItem('user', JSON.stringify(data));
      
      setUser(data);
      setIsAuthenticated(true);
      
      // Rediriger vers le dashboard
      navigate("/dashboard");
      
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  };

  const logout = () => {
    // Supprimer les données d'authentification
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    setUser(null);
    setIsAuthenticated(false);
    
    // Rediriger vers la page de connexion
    navigate("/");
  };

  const register = async (nom: string, prenom: string, password: string) => {
    try {
      const response = await fetch("http://localhost:9000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nom, prenom, password }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Erreur lors de la création du compte !");
      }

      const data = await response.json();
      
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  };

  const checkAuth = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      return false;
    }
    return true;
  };

  return {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    checkAuth,
  };
}; 