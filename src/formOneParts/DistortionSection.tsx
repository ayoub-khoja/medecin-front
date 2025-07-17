import React from "react";

interface Props {
  distortion: string;
  handleDistortionChange: (value: string) => void;
  showDistortionOptions: boolean;
  hoveredOption: string;
  setHoveredOption: (value: string) => void;
}

const DistortionSection: React.FC<Props> = ({
  distortion,
  handleDistortionChange,
  showDistortionOptions,
  hoveredOption,
  setHoveredOption,
}) => {
  const handleHover = (value: string) => setHoveredOption(value);
  const handleLeave = () => setHoveredOption("");

  return (
    <>
      <div className="content">
        <p className="title">Distorsion architecturale</p>
        <div className="options">
          <label className="checkbox-label">
            <input
              type="radio"
              name="distortion"
              value="oui"
              checked={distortion === "oui"}
              onChange={() => handleDistortionChange("oui")}
            />
            Oui
          </label>
          <label className="checkbox-label">
            <input
              type="radio"
              name="distortion"
              value="non"
              checked={distortion === "non"}
              onChange={() => handleDistortionChange("non")}
            />
            Non
          </label>
        </div>
      </div>

      {showDistortionOptions && (
        <div className="content">
          <p className="title">Options de distorsion architecturale</p>
          <div className="options">
            <label
              className={`checkbox-label ${hoveredOption === "centre claire" ? "hovered" : ""}`}
              onMouseEnter={() => handleHover("centre claire")}
              onMouseLeave={handleLeave}
            >
              <input type="checkbox" value="centre claire" />
              Centre claire
            </label>
            <label
              className={`checkbox-label ${hoveredOption === "centre dence" ? "hovered" : ""}`}
              onMouseEnter={() => handleHover("centre dence")}
              onMouseLeave={handleLeave}
            >
              <input type="checkbox" value="centre dence" />
              Centre dense
            </label>
          </div>

          {hoveredOption && (
            <div className="additional-content">
              {hoveredOption === "centre claire" && <img src="/claire.png" alt="Centre claire" />}
              {hoveredOption === "centre dence" && <img src="/dense.png" alt="Centre dense" />}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DistortionSection;
