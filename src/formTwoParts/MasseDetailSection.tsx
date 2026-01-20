import React from "react";
import BreastSchema from "../components/BreastSchema";

interface Props {
  index: number;
  localisation: string;
  distanceCentre: string;
  sein: "gauche" | "droite";
  mesure: string;
  forme: string;
  contour: string;
  densite: string;
  orientation: string;
  comportement: string;
  calcification: string;
  onLocalisationChange: (index: number, value: string) => void;
  onDistanceCentreChange: (index: number, value: string) => void;
  onSeinChange: (index: number, value: "gauche" | "droite") => void;
  onMesureChange: (index: number, value: string) => void;
  onMassesDataChange: (
    index: number,
    type: "forme" | "contour" | "densite" | "orientation" | "comportement" | "calcification",
    value: string
  ) => void;
}

const MasseDetailSection: React.FC<Props> = ({
  index,
  localisation,
  distanceCentre,
  sein,
  mesure,
  forme,
  contour,
  densite,
  orientation,
  comportement,
  calcification,
  onLocalisationChange,
  onDistanceCentreChange,
  onSeinChange,
  onMesureChange,
  onMassesDataChange,
}) => {
  const handleRadioChange = (
    type: "forme" | "contour" | "densite" | "orientation" | "comportement" | "calcification", 
    value: string
  ) => {
    onMassesDataChange(index, type, value);
  };

  const handleLocalisationChange = (value: string) => {
    onLocalisationChange(index, value);
  };

  const handleDistanceCentreChange = (value: string) => {
    onDistanceCentreChange(index, value);
  };

  const handleMesureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onMesureChange(index, e.target.value);
  };

  return (
    <div className="additional-section border rounded-lg mt-4 p-4">
      {/* Schéma mammaire avec localisation */}
      <BreastSchema
        localisation={localisation}
        distanceCentre={distanceCentre}
        sein={sein}
        onLocalisationChange={handleLocalisationChange}
        onDistanceCentreChange={handleDistanceCentreChange}
        onSeinChange={onSeinChange}
      />

      {/* Mesure */}
      <label className="form-label mt-4">Mesure {index + 1} (mm)</label>
      <input
        type="text"
        value={mesure}
        onChange={handleMesureChange}
        className="form-input"
        placeholder="Ex: 15x20"
      />

      {/* Forme */}
      <div className="form-radio-section mt-4">
        <p className="form-label">
          Forme de la masse 
          <span className="text-red-500 ml-1">*</span>
        </p>
        {["ovale", "ronde", "irrégulière"].map((f) => (
          <label key={f} className="radio-label">
            <input
              type="radio"
              name={`forme-${index}`}
              checked={forme === f}
              onChange={() => handleRadioChange("forme", f)}
              required
            />
            {f}
          </label>
        ))}
      </div>

      {/* Contours */}
      <div className="form-radio-section mt-4">
        <p className="form-label">
          Contours 
          <span className="text-red-500 ml-1">*</span>
        </p>
        {["circonscrits", "indistincts", "anguleux", "microlobulés", "spiculés"].map((c) => (
          <label key={c} className="radio-label">
            <input
              type="radio"
              name={`contour-${index}`}
              checked={contour === c}
              onChange={() => handleRadioChange("contour", c)}
              required
            />
            {c}
          </label>
        ))}
      </div>

      {/* Densité */}
      <div className="form-radio-section mt-4">
        <p className="form-label">
          Densité 
          <span className="text-red-500 ml-1">*</span>
        </p>
        {["haute", "isoéchogène", "hypoéchogène", "anéchogène", "complexe"].map((d) => (
          <label key={d} className="radio-label">
            <input
              type="radio"
              name={`densite-${index}`}
              checked={densite === d}
              onChange={() => handleRadioChange("densite", d)}
              required
            />
            {d}
          </label>
        ))}
      </div>

      {/* Orientation */}
      <div className="form-radio-section mt-4">
        <p className="form-label">Orientation</p>
        {["parallèle", "non parallèle"].map((o) => (
          <label key={o} className="radio-label">
            <input
              type="radio"
              name={`orientation-${index}`}
              checked={orientation === o}
              onChange={() => handleRadioChange("orientation", o)}
            />
            {o}
          </label>
        ))}
      </div>
      
      <div className="form-radio-section mt-4">
        <p className="form-label">Comportement</p>
        {["neutre", "renforcement postérieur", "atténuation postérieure", "combiné"].map((comp) => (
          <label key={comp} className="radio-label">
            <input
              type="radio"
              name={`comportement-${index}`}
              checked={comportement === comp}
              onChange={() => handleRadioChange("comportement", comp)}
            />
            {comp}
          </label>
        ))}
      </div>

      {/* Calcifications */}
      <div className="form-radio-section mt-4">
        <p className="form-label">Calcifications</p>
        {["dans la masse", "à distance de la masse", "intra-canalaire"].map((calc) => (
          <label key={calc} className="radio-label">
            <input
              type="radio"
              name={`calcification-${index}`}
              checked={calcification === calc}
              onChange={() => handleRadioChange("calcification", calc)}
            />
            {calc}
          </label>
        ))}
      </div>

      {/* Indicateur de validation */}
      {localisation && forme && contour && densite ? (
        <div className="mt-4 p-2 bg-green-100 border border-green-300 rounded">
          <p className="text-green-700 text-sm">
            ✅ Masse {index + 1} complète
          </p>
        </div>
      ) : (
        <div className="mt-4 p-2 bg-orange-100 border border-orange-300 rounded">
          <p className="text-orange-700 text-sm">
            ⚠️ Masse {index + 1} : Remplissez la localisation, forme, contours et densité
          </p>
        </div>
      )}
    </div>
  );
};

export default MasseDetailSection;