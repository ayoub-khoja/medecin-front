import React from "react";

interface Props {
  massNumber: string;
  setMassNumber: (value: string) => void;
  localisations: string[];
  handleLocalisationChange: (index: number, value: string) => void;
  formes: string[];
  contours: string[];
  densites: string[];
  handleMassesDataChange: (index: number, type: "forme" | "contour" | "densite", value: string) => void;
  hoveredOption: string;
  setHoveredOption: (value: string) => void;
}

const MassesSection: React.FC<Props> = ({
  massNumber,
  setMassNumber,
  localisations,
  handleLocalisationChange,
  formes,
  contours,
  densites,
  handleMassesDataChange,
  hoveredOption,
  setHoveredOption,
}) => {

  const handleHover = (value: string) => setHoveredOption(value);
  const handleLeave = () => setHoveredOption("");

  return (
    <>
      <div className="content">
        <p className="title">Nombre de masse</p>
        <input
          type="number"
          placeholder="Votre réponse"
          value={massNumber}
          onChange={(e) => setMassNumber(e.target.value)}
          className="text-input"
          min="0"
        />
      </div>

      {[...Array(Number(massNumber) || 0)].map((_, index) => (
        <div key={index} className="dynamic-section">
          {/* Localisation */}
          <div className="content">
            <p className="title">Localisation de la masse {index + 1}</p>
            <input
              type="text"
              placeholder="Votre réponse"
              value={localisations[index] || ""}
              onChange={(e) => handleLocalisationChange(index, e.target.value)}
              className="text-input"
            />
          </div>

          {/* Forme */}
          <div className="content">
            <p className="title">Forme de la masse {index + 1}</p>
            <div className="options">
              {["ovale", "ronde", "irrégulière"].map((option) => (
                <label key={option} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={option}
                    checked={formes[index] === option}
                    onChange={() => handleMassesDataChange(index, "forme", option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Contours */}
          <div className="content">
            <p className="title">Contours de la masse {index + 1}</p>
            <div className="options">
              {["circonscrits", "masqués", "microlobulés", "indistincts", "spiculés"].map((option) => (
                <label key={option} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={option}
                    checked={contours[index] === option}
                    onChange={() => handleMassesDataChange(index, "contour", option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Densité */}
          <div className="content">
            <p className="title">Densité de la masse {index + 1}</p>
            <div className="options">
              {["faible", "intermédiaire", "élevée"].map((option) => (
                <label key={option} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={option}
                    checked={densites[index] === option}
                    onChange={() => handleMassesDataChange(index, "densite", option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MassesSection;
