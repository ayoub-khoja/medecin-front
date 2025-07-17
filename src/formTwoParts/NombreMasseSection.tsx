import React from "react";

interface Props {
  nombreMasse: number | "";
  handleNombreMasseChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NombreMasseSection: React.FC<Props> = ({
  nombreMasse,
  handleNombreMasseChange,
}) => {
  return (
    <div className="form-input-section">
      <label className="form-label">Nombre de masse</label>
      <input
        type="number"
        min="0"
        value={nombreMasse}
        onChange={handleNombreMasseChange}
        className="form-input"
      />
    </div>
  );
};

export default NombreMasseSection;
