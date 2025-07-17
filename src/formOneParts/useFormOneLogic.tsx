import { useState } from "react";
import { useScanStore } from "../../src/store/useScanStore";

export const useFormOneLogic = (navigate: (path: string) => void) => {
  const { setFormOneData } = useScanStore();

  // États pour différents champs
  const [selected, setSelected] = useState<string[]>([]);
  const [massNumber, setMassNumber] = useState<string>("");
  const [localisations, setLocalisations] = useState<string[]>([]);
  const [asymmetry, setAsymmetry] = useState<string>("");
  const [asymmetryDetails, setAsymmetryDetails] = useState<string[]>([]); // Track selected asymmetry details
  const [distortion, setDistortion] = useState<string>("");
  const [calcifications, setCalcifications] = useState<string>("");
  const [signsAssociated, setSignsAssociated] = useState<string[]>([]);
  const [hoveredOption, setHoveredOption] = useState<string>("");
  const [showDistortionOptions, setShowDistortionOptions] = useState<boolean>(false);
  const [typeCalcification, setTypeCalcification] = useState<string>("");
  const [benigneSelected, setBenigneSelected] = useState<string[]>([]);
  const [suspecteSelected, setSuspecteSelected] = useState<string[]>([]);
  const [hoveredCalcificationOption, setHoveredCalcificationOption] = useState<string>("");
  const [distributionMicrocalcifications, setDistributionMicrocalcifications] = useState<string[]>([]);
  const [formes, setFormes] = useState<string[]>([]); // Mass shapes
  const [contours, setContours] = useState<string[]>([]); // Mass contours
  const [densites, setDensites] = useState<string[]>([]); // Mass densities

  const handleCheckboxChange = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };
  const handleLocalisationChange = (index: number, value: string) => {
    setLocalisations((prev) => {
      const newLocalisations = [...prev];
      newLocalisations[index] = value;
      return newLocalisations;
    });
  };
  const handleAsymmetryChange = (value: string) => {
    setAsymmetry(value);
    if (value === "non") {
      setAsymmetryDetails([]); // Clear details if asymmetry is "non"
    }
  };
  const handleAsymmetryDetailsChange = (value: string) => {
    setAsymmetryDetails((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleDistortionChange = (value: string) => {
    setDistortion(value);
    setShowDistortionOptions(value === "oui");
  };

  const handleCalcificationsChange = (value: string) => {
    setCalcifications(value);
    if (value === "non") {
      setTypeCalcification("");
      setBenigneSelected([]);
      setSuspecteSelected([]);
    }
  };

  const handleTypeCalcificationChange = (value: string) => {
    if (typeCalcification === value) {
      setTypeCalcification("");
    } else {
      setTypeCalcification(value);
    }
  };

  const handleBenigneCheckboxChange = (value: string) => {
    setBenigneSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSuspecteCheckboxChange = (value: string) => {
    setSuspecteSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleCalcificationLeave = () => setHoveredCalcificationOption("");

  const handleSignsAssociatedChange = (value: string) => {
    setSignsAssociated((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };
  const handleDistributionChange = (option: string) => {
    setDistributionMicrocalcifications((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };
    // Handle mass number changes and reset related state
  const handleMassNumberChange = (value: string) => {
      setMassNumber(value);
      const numberOfMasses = Number(value);
  
      // Reset states for all new masses when number of masses changes
      setLocalisations(new Array(numberOfMasses).fill(""));
      setFormes(new Array(numberOfMasses).fill(""));
      setContours(new Array(numberOfMasses).fill(""));
      setDensites(new Array(numberOfMasses).fill(""));
    };
 
  const handleMassesDataChange = (index: number, type: "forme" | "contour" | "densite", value: string) => {
    if (type === "forme") {
      setFormes((prev) => {
        const newFormes = [...prev];
        newFormes[index] = value;
        return newFormes;
      });
    } else if (type === "contour") {
      setContours((prev) => {
        const newContours = [...prev];
        newContours[index] = value;
        return newContours;
      });
    } else if (type === "densite") {
      setDensites((prev) => {
        const newDensites = [...prev];
        newDensites[index] = value;
        return newDensites;
      });
    }
  };


  const steps = [
    { title: "Mammographie", status: "in-progress" as const },
    { title: "Échographie", status: "pending" as const },
    { title: "Conclusion", status: "pending" as const },
  ];

  // Fonction pour passer aux étapes suivantes
  const handleNextClick = () => {
    const massesMammographie = localisations.map((localisation, index) => ({
      localisation,
      forme: formes[index] || "",
      contours: contours[index] || "",
      densite: densites[index] || "",
    }));

    setFormOneData({
  densiteMammaire: selected.length > 0 ? selected.join(", ") : null,
  massesMammographie: massesMammographie.length > 0 ? massesMammographie : null,
  asymetrie: asymmetry === "oui" ? true : null,
  typeAsymetrie: asymmetry === "oui" ? asymmetryDetails.join(", ") : null,
  distorsionArchitecturale: distortion === "oui" ? true : null,
  optionDistorsionArchitecturale: distortion === "oui" ? "Aucune" : null,
  calcifications: calcifications === "oui" ? true : null,
  typesCalcifications: typeCalcification || null,
  signesAssociesMammographie: signsAssociated.length > 0 ? signsAssociated : null, // 🔥 Correction ici
  calcificationsBenignes: benigneSelected.length > 0 ? benigneSelected.join(", ") : null,
  calcificationsSuspectes: suspecteSelected.length > 0 ? suspecteSelected.join(", ") : null,
  distributionMicrocalcifications: distributionMicrocalcifications.length > 0 ? distributionMicrocalcifications.join(", ") : null,
});


    navigate("/formtwo");
  };

  return {
    massNumber,
    setMassNumber: handleMassNumberChange,
    localisations,
    handleLocalisationChange,
    formes,
    setFormes,
    contours,
    setContours,
    densites,
    setDensites,
    handleMassesDataChange,
    handleNextClick,
    steps,
    selected,
    asymmetry,
    asymmetryDetails, // Exposer les détails d'asymétrie
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
    hoveredOption,
    setHoveredOption,
    hoveredCalcificationOption,
    setHoveredCalcificationOption,
    handleCalcificationLeave,
    signsAssociated,
    handleSignsAssociatedChange,
    distributionMicrocalcifications,
    handleDistributionChange, 
    handleCheckboxChange: (value: string) => {
      setSelected((prev) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
      );
    },
  };
};
