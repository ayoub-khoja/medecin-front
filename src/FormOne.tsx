import React from "react";
import ReturnIcon from "./icons/return";
import { useNavigate } from "react-router-dom";
import Stepper from "./steppper/Stepper";
import DensiteSection from "./formOneParts/DensiteSection";
import MassesSection from "./formOneParts/MassesSection";
import AsymmetrySection from "./formOneParts/AsymmetrySection";
import DistortionSection from "./formOneParts/DistortionSection";
import CalcificationSection from "./formOneParts/CalcificationSection";
import SignsSection from "./formOneParts/SignsSection";
import NextButton from "./formOneParts/NextButton";
import { useFormOneLogic } from "./formOneParts/useFormOneLogic";
import "./style/Mammographie.css";

const FormOne: React.FC = () => {
  const navigate = useNavigate();
  const {
    steps,
    hoveredOption,
    setHoveredOption,
    massNumber,
    setMassNumber,
    localisations,
    handleLocalisationChange,
    selected,
    handleCheckboxChange,
    handleMassesDataChange,

    hoveredCalcificationOption,
    setHoveredCalcificationOption,
    asymmetry,
    asymmetryDetails,
    handleAsymmetryChange,
    handleAsymmetryDetailsChange,
    distortion,
    handleDistortionChange,
    showDistortionOptions,
    calcifications,
    handleCalcificationsChange,
    typeCalcification,
    handleTypeCalcificationChange,
    benigneSelected,
    handleBenigneCheckboxChange,
    suspecteSelected,
    handleSuspecteCheckboxChange,
    handleCalcificationLeave,
    signsAssociated,
    handleSignsAssociatedChange,
    handleNextClick,
    distributionMicrocalcifications,  // Récupérer la valeur
    handleDistributionChange,  // Récupérer la fonction
    formes, // Newly added
    setFormes, // Newly added
    contours, // Newly added
    setContours, // Newly added
    densites, // Newly added
    setDensites, // Newly added
  } = useFormOneLogic(navigate);

  return (
    <div className="mammographie-container">
      <ReturnIcon onClick={() => navigate(-1)} />
      <Stepper steps={steps} currentStep={0} />
      <div className="header">MAMOGRAPHIE</div>

      <DensiteSection
        selected={selected}
        hoveredOption={hoveredOption}
        setHoveredOption={setHoveredOption}
        handleCheckboxChange={handleCheckboxChange}
      />
      <MassesSection
        massNumber={massNumber}
        setMassNumber={setMassNumber}
        localisations={localisations}
        handleLocalisationChange={handleLocalisationChange}
        hoveredOption={hoveredOption}
        setHoveredOption={setHoveredOption}
        formes={formes}
        contours={contours}
        densites={densites}
        handleMassesDataChange={handleMassesDataChange}
      />

      <AsymmetrySection
        asymmetry={asymmetry}
        handleAsymmetryChange={handleAsymmetryChange}
        asymmetryDetails={asymmetryDetails}
        handleAsymmetryDetailsChange={handleAsymmetryDetailsChange}
      />
      <DistortionSection
        distortion={distortion}
        handleDistortionChange={handleDistortionChange}
        showDistortionOptions={showDistortionOptions}
        hoveredOption={hoveredOption}
        setHoveredOption={setHoveredOption}
      />

      <CalcificationSection
        calcifications={calcifications}
        handleCalcificationsChange={handleCalcificationsChange}
        typeCalcification={typeCalcification}
        handleTypeCalcificationChange={handleTypeCalcificationChange}
        benigneSelected={benigneSelected}
        handleBenigneCheckboxChange={handleBenigneCheckboxChange}
        suspecteSelected={suspecteSelected}
        handleSuspecteCheckboxChange={handleSuspecteCheckboxChange}
        hoveredCalcificationOption={hoveredCalcificationOption}
        setHoveredCalcificationOption={setHoveredCalcificationOption}
        handleCalcificationLeave={handleCalcificationLeave}
        distributionMicrocalcifications={distributionMicrocalcifications} // Passer les propriétés
        handleDistributionChange={handleDistributionChange}
      />

      <SignsSection
        signsAssociated={signsAssociated}
        handleSignsAssociatedChange={handleSignsAssociatedChange}
      />

      <NextButton handleNextClick={handleNextClick} />
    </div>
  );
};

export default FormOne;
