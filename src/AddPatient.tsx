// ✅ Les imports doivent être en haut
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReturnIcon from "./icons/return";
import { toast } from "sonner";
import { useScanStore } from "../src/store/useScanStore"; // ✅ Correctement placé
import "./style/AddPatient.css"
const AddPatientForm: React.FC = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState(""); 
  const [renseignements, setRenseignements] = useState("");

  const navigate = useNavigate();
  const { setClientId } = useScanStore(); // ✅ Récupérer setClientId depuis Zustand

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const patientData = {
      nom,
      prenom,
      renseignementsCliniques: renseignements,
    };

    try {
      const response = await axios.post(
        "http://localhost:9000/api/clients/enregistrer",
        patientData
      );

      // ✅ Stocker l'ID du client dans Zustand
      setClientId(response.data.id);

      toast.success("Patient enregistré avec succès !", {
        icon: "🚀",
      });

      console.log("Patient enregistré :", response.data);

      // Rediriger vers la suite du formulaire
      navigate("/formone");
    } catch (error: any) {
      toast.error(error.message || "❌ Erreur lors de l'enregistrement du patient !");
      console.error("Erreur lors de l'enregistrement du patient:", error);
    }
  };

  return (
    <div className="patient-wrapper">
      <div className="patient-image-section">
        <img src="/cl.jpg" alt="Patient visual" className="patient-image" />
      </div>

      <div className="patient-form-section">
        <button className="patient-back-btn" onClick={() => navigate(-1)}>
          <ReturnIcon />
        </button>

        <form className="patient-form" onSubmit={handleSubmit}>
          <h1 className="patient-title">Ajouter un nouveau patient</h1>

          <div className="form-group">
            <input
              type="text"
              className="patient-input"
              placeholder="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
          <input
              type="text"
              className="patient-input"
              placeholder="Prénom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              className="patient-input renseignements"
              placeholder="Renseignements cliniques"
              value={renseignements}
              onChange={(e) => setRenseignements(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="patient-btn">
            Enregistrer
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPatientForm;
