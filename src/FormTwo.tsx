import React from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "./steppper/Stepper";
import ReturnIcon from "./icons/return";
import "./style/FormTwo.css";
import { useFormTwoLogic } from "./formTwoParts/useFormTwoLogic";
import EchostructureMammaireSection from "./formTwoParts/EchostructureMammaireSection";
import NombreMasseSection from "./formTwoParts/NombreMasseSection";
import MasseDetailSection from "./formTwoParts/MasseDetailSection";
import SignesAssociesSection from "./formTwoParts/SignesAssociesSection";
import CasSpeciauxSection from "./formTwoParts/CasSpeciauxSection";
import NextButton from "./formTwoParts/NextButton";

const FormTwo: React.FC = () => {
  const navigate = useNavigate();
  const {
    steps,
    nombreMasse,
    localisations,
    mesures,
    formes,
    contours,
    densites,
    orientations,
    comportements,
    calcifications,
    echostructureMammaire,
    signesAssocies,
    casSpeciaux,
    casSpeciauxLocalisations,
    handleNombreMasseChange,
    handleLocalisationChange,
    handleMesureChange,
    handleMassesDataChange,
    handleEchostructureChange,
    handleSignesAssociesChange,
    handleCasSpeciauxChange,
    handleCasSpeciauxLocalisationChange,
    handleNextClick,
  } = useFormTwoLogic(navigate);

  return (
    <div className="form-two-container">
      <ReturnIcon onClick={() => navigate(-1)} />
      <Stepper steps={steps} currentStep={1} />

      <h2 className="form-two-title">ECHOGRAPHIE MAMMAIRE</h2>

      <EchostructureMammaireSection
        echostructureMammaire={echostructureMammaire || ""}
        handleEchostructureChange={handleEchostructureChange}
      />

      <NombreMasseSection
        nombreMasse={nombreMasse}
        handleNombreMasseChange={handleNombreMasseChange}
      />

      {new Array(Number(nombreMasse) || 0).fill(0).map((_, index) => (
        <MasseDetailSection
          key={index}
          index={index}
          localisation={localisations[index] || ""}
          mesure={mesures[index] || ""}
          forme={formes[index] || ""}
          contour={contours[index] || ""}
          densite={densites[index] || ""}
          orientation={orientations[index] || ""}
          comportement={comportements[index] || ""}
          calcification={calcifications[index] || ""}
          onLocalisationChange={handleLocalisationChange}
          onMesureChange={handleMesureChange}
          onMassesDataChange={handleMassesDataChange}
        />
      ))}

      <SignesAssociesSection
        signesAssocies={signesAssocies}
        handleSignesAssociesChange={handleSignesAssociesChange}
      />

      <CasSpeciauxSection
        casSpeciaux={casSpeciaux}
        handleCasSpeciauxChange={handleCasSpeciauxChange}
        localisations={casSpeciauxLocalisations}
        handleLocalisationChange={handleCasSpeciauxLocalisationChange}
      />

      <NextButton handleNextClick={handleNextClick} />
    </div>
  );
};

export default FormTwo;
