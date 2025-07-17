import React from "react";

interface Props {
  selected: string[];
  hoveredOption: string;
  setHoveredOption: (value: string) => void;
  handleCheckboxChange: (value: string) => void;
}

const DensiteSection: React.FC<Props> = ({
  selected,
  hoveredOption,
  setHoveredOption,
  handleCheckboxChange,
}) => {
  const handleOptionHover = (option: string) => setHoveredOption(option);
  const handleOptionLeave = () => setHoveredOption("");

  return (
    <div className="content">
      <p className="title">Densité mammaire</p>
      <div className="options">
        {["A", "B", "C", "D"].map((option) => (
          <label
            key={option}
            className={`checkbox-label ${hoveredOption === option ? "hovered" : ""}`}
            onMouseEnter={() => handleOptionHover(option)}
            onMouseLeave={handleOptionLeave}
          >
            <input
              type="checkbox"
              value={option}
              checked={selected.includes(option)}
              onChange={() => handleCheckboxChange(option)}
            />
            {option}
          </label>
        ))}
      </div>
      {hoveredOption && (
        <div className="image-preview">
          <img src={`/${hoveredOption}.png`} alt={`Option ${hoveredOption}`} />
        </div>
      )}
    </div>
  );
};

export default DensiteSection;
