import React from "react";

interface Props {
  asymmetry: string;
  handleAsymmetryChange: (value: string) => void;
  asymmetryDetails: string[];
  handleAsymmetryDetailsChange: (value: string) => void;
}

const AsymmetrySection: React.FC<Props> = ({
  asymmetry,
  handleAsymmetryChange,
  asymmetryDetails,
  handleAsymmetryDetailsChange,
}) => {
  const handleCheckboxChange = (value: string) => {
    handleAsymmetryDetailsChange(value); // Mise à jour des détails de l'asymétrie
  };

  return (
    <>
      <div className="content">
        <p className="title">Asymétrie si présente?</p>
        <div className="options">
          <label className="checkbox-label">
            <input
              type="radio"
              name="asymmetry"
              value="oui"
              checked={asymmetry === "oui"}
              onChange={() => handleAsymmetryChange("oui")}
            />
            Oui
          </label>
          <label className="checkbox-label">
            <input
              type="radio"
              name="asymmetry"
              value="non"
              checked={asymmetry === "non"}
              onChange={() => handleAsymmetryChange("non")}
            />
            Non
          </label>
        </div>
      </div>

      {/* Check if asymmetry is "oui", then display the details form */}
      {asymmetry === "oui" && (
        <div className="content">
          <p className="title">Asymétrie détails</p>
          <div className="options">
            {["asymétrie", "globale", "focale", "évolutive"].map((option) => (
              <label key={option} className="checkbox-label">
                <input
                  type="checkbox"
                  value={option}
                  checked={asymmetryDetails.includes(option)} // Vérification si la valeur est sélectionnée
                  onChange={() => handleCheckboxChange(option)} // Gestion du changement
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AsymmetrySection;
