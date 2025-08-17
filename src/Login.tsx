import React, { useState } from "react";
import { toast } from "sonner"; // ✅ Import du toast
import { useAuth } from "./hooks/useAuth";
import LanguageSelector from "./components/LanguageSelector";
import "./style/LoginForm.css";

const LoginForm: React.FC = () => {
  const [nom, setNom] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await login(nom, password);
      
      if (result.success) {
        // ✅ Toast de succès
        toast.success("Connexion réussie !", {
          icon: "🚀"
        });
        console.log("Utilisateur connecté :", result.data);
      } else {
        // ✅ Toast d'erreur
        toast.error(result.error?.message || "❌ Erreur de connexion !");
      }
    } catch (error: unknown) {
      const err = error as Error;
      // ✅ Toast d'erreur
      toast.error(err.message || "❌ Erreur de connexion !");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-image-section">
        <img src="/logo-login-principale.png" alt="Login visual" className="login-image" />
      </div>
      
      <div className="language-selector-container">
        <LanguageSelector 
          onLanguageChange={(language) => {
            console.log('Langue sélectionnée:', language);
            // Ici vous pouvez ajouter la logique pour changer la langue
          }}
        />
      </div>
      
      <div className="logos-container">
        <img src="/logo.png" alt="Logo" className="login-logo" />
        <span className="logo-text">Cancer IA</span> {/* ✅ Texte ajouté */}
        <img src="/drapeau.avif" alt="Drapeau" className="drapeau-logo" />
      </div>

      <div className="login-form-section">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="login-title1">Bienvenue Docteur </h1>

          <div className="form-group">
            <div className="input-icon">
              <i className="fas fa-user"></i> {/* ✅ Icône utilisateur */}
              <input
                type="text"
                className="input-field"
                placeholder="Nom et prénom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-icon">
              <i className="fas fa-lock"></i> {/* ✅ Icône mot de passe */}
              <input
                type="password"
                className="input-field"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#" className="forgot-password">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="login-btn">
            Se Connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
