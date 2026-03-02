import React from "react";

interface CalcificationItem {
  value: string;
  image: string;
}

interface Props {
  calcifications: string;
  handleCalcificationsChange: (value: string) => void;
  typeCalcification: string;
  handleTypeCalcificationChange: (value: string) => void;
  benigneSelected: string[];
  handleBenigneCheckboxChange: (value: string) => void;
  suspecteSelected: string[];
  handleSuspecteCheckboxChange: (value: string) => void;
  hoveredCalcificationOption: string;
  setHoveredCalcificationOption: (value: string) => void;
  handleCalcificationLeave: () => void;
  distributionMicrocalcifications: string[];
  handleDistributionChange: (value: string) => void;
}

const benigneCalcifications: CalcificationItem[] = [
  { value: "cutanées", image: "/skin.png" },
  { value: "vasculaires", image: "/vasculaire.png" },
  { value: "en pop corn", image: "/pop.png" },
  { value: "lait calcique", image: "/milk.png" },
  { value: "mastite à plasmocyte", image: "/rod.png" },
  { value: "dystrophique", image: "/dist.png" },
  { value: "coquille d'oeuf", image: "/rim.png" },
  { value: "punctiformes", image: "/punct.png" },
  { value: "rondes", image: "/roundd.png" },
];

const suspecteCalcifications: CalcificationItem[] = [
  { value: "amorphes", image: "/dcis.png" },
  { value: "grossières hétérogènes", image: "/coar.png" },
  { value: "fines pléomorphes", image: "/fine.png" },
  { value: "fines linéaires ou fines linéaires branchés", image: "/branch.png" },
];

const distributionOptions = ["diffuses", "régionales", "segmentaires", "groupées", "linéaires"];

const CalcificationSection: React.FC<Props> = ({
  calcifications = "non",
  handleCalcificationsChange,
  typeCalcification = "",
  handleTypeCalcificationChange,
  benigneSelected = [],
  handleBenigneCheckboxChange,
  suspecteSelected = [],
  handleSuspecteCheckboxChange,
  hoveredCalcificationOption,
  setHoveredCalcificationOption,
  handleCalcificationLeave,
  distributionMicrocalcifications = [],
  handleDistributionChange,
}) => {
  return (
    <div className="calcification-section">
      {/* Section principale Calcifications */}
      <div className="section">
        <h3 className="section-title">Calcifications</h3>
        <div className="radio-group">
          {["oui", "non"].map((option) => (
            <label key={option} className="radio-label">
              <input
                type="radio"
                name="calcifications"
                value={option}
                checked={calcifications === option}
                onChange={() => handleCalcificationsChange(option)}
              />
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {calcifications === "oui" && (
        <>
          {/* Types de calcifications */}
          <div className="section">
            <h3 className="section-title">Types de calcifications</h3>
            <div className="radio-group">
              {["bénigne", "suspecte"].map((type) => (
                <label key={type} className="radio-label">
                  <input
                    type="radio"
                    name="typeCalcification"
                    value={type}
                    checked={typeCalcification === type}
                    onChange={() => handleTypeCalcificationChange(type)}
                  />
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {/* Calcifications bénignes */}
          {typeCalcification === "bénigne" && (
            <div className="section">
              <h3 className="section-title">Calcifications bénignes</h3>
              <div className="checkbox-grid">
                {benigneCalcifications.map((item) => (
                  <div
                    key={item.value}
                    className="checkbox-item"
                    onMouseEnter={() => setHoveredCalcificationOption(item.value)}
                    onMouseLeave={handleCalcificationLeave}
                  >
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={benigneSelected.includes(item.value)}
                        onChange={() => handleBenigneCheckboxChange(item.value)}
                      />
                      <span>{item.value}</span>
                    </label>
                    {hoveredCalcificationOption === item.value && (
                      <div className="image-preview">
                        <img src={item.image} alt={item.value} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Calcifications suspectes */}
          {typeCalcification === "suspecte" && (
            <>
              <div className="section">
                <h3 className="section-title">Calcifications suspectes</h3>
                <div className="checkbox-grid">
                  {suspecteCalcifications.map((item) => (
                    <div
                      key={item.value}
                      className="checkbox-item"
                      onMouseEnter={() => setHoveredCalcificationOption(item.value)}
                      onMouseLeave={handleCalcificationLeave}
                    >
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={suspecteSelected.includes(item.value)}
                          onChange={() => handleSuspecteCheckboxChange(item.value)}
                        />
                        <span>{item.value}</span>
                      </label>
                      {hoveredCalcificationOption === item.value && (
                        <div className="image-preview">
                          <img src={item.image} alt={item.value} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Distribution des microcalcifications */}
              {suspecteSelected.length > 0 && (
                <div className="section">
                  <h3 className="section-title">Distribution des microcalcifications</h3>
                  <div className="checkbox-group">
                    {distributionOptions.map((option) => (
                      <label key={option} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={distributionMicrocalcifications.includes(option)}
                          onChange={() => handleDistributionChange(option)}
                        />
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CalcificationSection;
