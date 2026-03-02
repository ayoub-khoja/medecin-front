import React from "react";

interface Props {
  handleNextClick: () => void;
}

const NextButton: React.FC<Props> = ({ handleNextClick }) => {
  return (
    <div className="button-next-container">
      <button onClick={handleNextClick} className="button-next">
        Suivant
      </button>
    </div>
  );
};

export default NextButton;
