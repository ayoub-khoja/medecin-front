import React from "react";

interface Props {
  handleSubmit: () => void;
}

const SubmitButton: React.FC<Props> = ({ handleSubmit }) => {
  return (
    <div className="mt-6">
      <button
        onClick={handleSubmit}
        className="form-submit-btn"
      >
        Enregistrer le scan
      </button>
    </div>
  );
};

export default SubmitButton;
