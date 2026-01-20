import { useState } from "react";
import { useScanStore } from "../../src/store/useScanStore";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useFormTwoLogic = (navigate: ReturnType<typeof useNavigate>) => {
  const { formOneData, clientId } = useScanStore();

  const [nombreMasse, setNombreMasse] = useState<number | "">("");
  const [localisations, setLocalisations] = useState<string[]>([]);
  const [distancesCentre, setDistancesCentre] = useState<string[]>([]);
  const [seins, setSeins] = useState<("gauche" | "droite")[]>([]);
  const [mesures, setMesures] = useState<string[]>([]);
  const [formes, setFormes] = useState<string[]>([]);
  const [contours, setContours] = useState<string[]>([]);
  const [densites, setDensites] = useState<string[]>([]);
  const [orientations, setOrientations] = useState<string[]>([]);
  const [comportements, setComportements] = useState<string[]>([]);
  const [calcifications, setCalcifications] = useState<string[]>([]);
  const [echostructureMammaire, setEchostructureMammaire] = useState<string>("");
  const [signesAssocies, setSignesAssocies] = useState<string[]>([]);
  const [casSpeciaux, setCasSpeciaux] = useState<string[]>([]);
  const [casSpeciauxLocalisations, setCasSpeciauxLocalisations] = useState<{ [key: string]: string }>({});

  const steps = [
    { title: "Mammographie", status: "completed" as const },
    { title: "Échographie", status: "in-progress" as const },
    { title: "Conclusion", status: "pending" as const },
  ];

  // HANDLERS

  // Nombre de masse
  const handleNombreMasseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNombreMasse(value === "" ? "" : Math.max(0, Number(value)));
  };

  // Localisation d'une masse
  const handleLocalisationChange = (index: number, value: string) => {
    setLocalisations((prev) => {
      const arr = [...prev];
      arr[index] = value;
      return arr;
    });
  };

  // Distance du centre d'une masse
  const handleDistanceCentreChange = (index: number, value: string) => {
    setDistancesCentre((prev) => {
      const arr = [...prev];
      arr[index] = value;
      return arr;
    });
  };

  // Sein d'une masse
  const handleSeinChange = (index: number, value: "gauche" | "droite") => {
    setSeins((prev) => {
      const arr = [...prev];
      arr[index] = value;
      return arr;
    });
  };

  // Mesure d'une masse
  const handleMesureChange = (index: number, value: string) => {
    setMesures((prev) => {
      const arr = [...prev];
      arr[index] = value;
      return arr;
    });
  };

  // Données de masse (forme, contour, densité, orientation, comportement, calcification)
  const handleMassesDataChange = (
    index: number,
    field: "forme" | "contour" | "densite" | "orientation" | "comportement" | "calcification",
    value: string
  ) => {
    const setters: { [key: string]: React.Dispatch<React.SetStateAction<string[]>> } = {
      forme: setFormes,
      contour: setContours,
      densite: setDensites,
      orientation: setOrientations,
      comportement: setComportements,
      calcification: setCalcifications,
    };
    setters[field]((prev) => {
      const arr = [...prev];
      arr[index] = value;
      return arr;
    });
  };

  // Signes associés
  const handleSignesAssociesChange = (selected: string[]) => {
    setSignesAssocies(selected);
  };

  // Cas spéciaux
  const handleCasSpeciauxChange = (selected: string[]) => {
    setCasSpeciaux(selected);
  };

  // Localisation d'un cas spécial
  const handleCasSpeciauxLocalisationChange = (name: string, localisation: string) => {
    setCasSpeciauxLocalisations((prev) => ({
      ...prev,
      [name]: localisation,
    }));
  };

  // Échostructure mammaire
  const handleEchostructureChange = (value: string) => {
    setEchostructureMammaire(value);
  };

  // NEXT
  const handleNextClick = async () => {
    // ✅ VALIDATION : Vérifier que le nombre de masses est défini
    if (!nombreMasse || nombreMasse === 0) {
      toast.error("⚠️ Veuillez définir le nombre de masses échographiques");
      return;
    }

    // ✅ CORRECTION : Toujours créer le tableau des masses échographiques
    const massesEchographie = localisations.map((localisation, index) => ({
      localisation: localisation || "",
      distanceCentre: distancesCentre[index] || "",
      sein: seins[index] || "gauche",
      mesure: mesures[index] || "",
      forme: formes[index] || "",
      contours: contours[index] || "",
      densite: densites[index] || "",
      orientation: orientations[index] || "",
      comportementDesFaisceauxUltrasons: comportements[index] || "",
      calcifications: calcifications[index] || "",
    }));

    // ✅ VALIDATION : Vérifier que les données échographiques sont remplies
    const hasEchographieData = massesEchographie.some(masse => 
      masse.localisation && masse.forme && masse.contours && masse.densite
    );

    if (!hasEchographieData) {
      toast.error("⚠️ Veuillez remplir au moins une masse échographique complète (localisation, forme, contours, densité)");
      return;
    }

    // ✅ VALIDATION : Vérifier que l'échostructure mammaire est définie
    if (!echostructureMammaire) {
      toast.error("⚠️ Veuillez sélectionner l'échostructure mammaire");
      return;
    }

    const scanData = {
      densiteMammaire: formOneData.densiteMammaire || null,
      asymetrie: formOneData.asymetrie !== null ? formOneData.asymetrie : null,
      typeAsymetrie: formOneData.typeAsymetrie || null,
      distorsionArchitecturale: formOneData.distorsionArchitecturale !== null ? formOneData.distorsionArchitecturale : null,
      optionDistorsionArchitecturale: formOneData.optionDistorsionArchitecturale || null,
      calcifications: formOneData.calcifications !== null ? formOneData.calcifications : null,
      typesCalcifications: formOneData.typesCalcifications || null,
      calcificationsBenignes: formOneData.calcificationsBenignes || null,
      calcificationsSuspectes: formOneData.calcificationsSuspectes || null,
      distributionMicrocalcifications: formOneData.distributionMicrocalcifications || null,
      signesAssociesMammographie: formOneData.signesAssociesMammographie || null,
      echostructureMammaire: echostructureMammaire || null,
      signesAssociesEchostructure: signesAssocies.length ? signesAssocies : null,
      casSpeciaux: casSpeciaux.map((name) => ({
        nom: name,
        localisation: casSpeciauxLocalisations[name] || "",
      })),
      conclusionRadiologue: null,
      conduiteRadiologue: null,
      conclusionIA: null,
      conduiteATenir: null,
      client: { id: clientId || null },
      massesMammographie: formOneData.massesMammographie?.length ? formOneData.massesMammographie : null,
      // ✅ CORRECTION : Toujours envoyer les masses échostructure
      massesEchostructure: massesEchographie,
    };

    console.log("📊 Données échographiques à envoyer:", massesEchographie);
    console.log("📊 Scan data complet:", scanData);

    try {
      const response = await axios.post("http://localhost:9000/api/mammary-scan/add", scanData);
      const createdScan = response.data;
      const scanId = createdScan.id;

      toast.success("Scan enregistré avec succès ✅");

      // Appel immédiat pour déclencher l'analyse IA
      await axios.get(`http://localhost:9000/api/mammary-scan/acr/${scanId}`);
      toast.success("Analyse IA lancée ✅");

      navigate("/formthree", { state: { scanId } });
    } catch (error) {
      toast.error("Erreur lors de la création du scan ou de l'analyse IA ❌");
      console.error(error);
    }
  };

  return {
    steps,
    nombreMasse,
    localisations,
    distancesCentre,
    seins,
    mesures,
    formes,
    contours,
    densites,
    orientations,
    comportements,
    calcifications,
    casSpeciaux,
    casSpeciauxLocalisations,
    signesAssocies,
    handleNextClick,
    echostructureMammaire,
    handleEchostructureChange,
    handleNombreMasseChange,
    handleLocalisationChange,
    handleDistanceCentreChange,
    handleSeinChange,
    handleMesureChange,
    handleMassesDataChange,
    handleSignesAssociesChange,
    handleCasSpeciauxChange,
    handleCasSpeciauxLocalisationChange,
  };
};