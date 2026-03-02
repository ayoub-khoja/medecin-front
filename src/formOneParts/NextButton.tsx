import React from "react";

interface Props {
  handleNextClick: () => void;
}

const NextButton: React.FC<Props> = ({ handleNextClick }) => {
  return (
    <div className="content">
      <button onClick={handleNextClick} className="next-button">
        Suivant
      </button>
    </div>
  );
};

export default NextButton;
