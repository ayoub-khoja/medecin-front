import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; // ✅ Import du toast
import "./style/LoginForm.css";

const LoginForm: React.FC = () => {
  const [nom, setNom] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:9000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: nom,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Nom ou mot de passe incorrect !");
      }

      const data = await response.json();
      console.log("Utilisateur connecté :", data);

      // ✅ Toast de succès
      toast.success("Connexion réussie !", {
        icon: "🚀"
      });
      
      // Redirection vers la page home
      navigate("/home");
    } catch (error: any) {
      // ✅ Toast d'erreur
      toast.error(error.message || "❌ Erreur de connexion !");
    }
  };

  return (
    <div className="login-wrapper">
  <div className="login-image-section">
    <img src="/mm.avif" alt="Login visual" className="login-image" />
  </div>

  <div className="logos-container">
    <img src="/logo.png" alt="Logo" className="login-logo" />
    <img src="/drapeau.avif" alt="Drapeau" className="drapeau-logo" />
  </div>

  <div className="login-form-section">
    <form className="login-form" onSubmit={handleSubmit}>
      <h1 className="login-title1">Bienvenue Docteur </h1>

      <div className="form-group">
        <input
          type="text"
          className="input-field"
          placeholder="Nom et prénom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          className="input-field"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
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
