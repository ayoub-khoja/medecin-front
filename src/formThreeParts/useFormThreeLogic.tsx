import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

export const useFormThreeLogic = (navigate: ReturnType<typeof useNavigate>) => {
  const location = useLocation();
  const { scanId } = location.state || {};

  const [conclusionIA, setConclusionIA] = useState<string>("");
  const [conduiteIA, setConduiteIA] = useState<string>("");
  // ✅ NOUVEAU : justification détaillée de l'IA (optionnelle)
  const [justificationIA, setJustificationIA] = useState<string>("");
  const [acrType, setAcrType] = useState<string>("");
  const [acrScore, setAcrScore] = useState<string>(""); // ✅ NOUVEAU : Score ACR
  const [loadingIA, setLoadingIA] = useState<boolean>(true);
  
  // ✅ NOUVEAUX : États pour le compte rendu médical
  const [scanData, setScanData] = useState<any>(null);
  const [showMedicalReport, setShowMedicalReport] = useState<boolean>(false);

  const steps = [
    { title: "Mammographie", status: "completed" as const },
    { title: "Échographie", status: "completed" as const },
    { title: "Conclusion", status: "in-progress" as const },
  ];

  // ✅ NOUVELLE FONCTION : Transformer les données de l'API pour le compte rendu
  const transformScanDataForReport = (scan: any) => {
    return {
      scanId: scan.id?.toString(),
      clientInfo: scan.client ? {
        nom: scan.client.nom,
        prenom: scan.client.prenom,
        renseignementsCliniques: scan.client.renseignementsCliniques
      } : null,
      mammographie: {
        densiteMammaire: scan.densiteMammaire,
        masses: scan.massesMammographie?.map((masse: any) => ({
          localisation: masse.localisation,
          forme: masse.forme,
          contours: masse.contours,
          densite: masse.densite
        })) || [],
        asymetrie: scan.asymetrie,
        typeAsymetrie: scan.typeAsymetrie,
        distorsionArchitecturale: scan.distorsionArchitecturale,
        calcifications: scan.calcifications,
        typesCalcifications: scan.typesCalcifications,
        signesAssocies: scan.signesAssociesMammographie?.map((s: any) => s.signe) || []
      },
      echographie: {
        echostructureMammaire: scan.echostructureMammaire,
        masses: scan.massesEchostructure?.map((masse: any) => ({
          localisation: masse.localisation,
          mesure: masse.mesure,
          forme: masse.forme,
          contours: masse.contours,
          densite: masse.densite,
          orientation: masse.orientation,
          comportement: masse.comportementDesFaisceauxUltrasons,
          calcifications: masse.calcifications
        })) || [],
        signesAssocies: scan.signesAssociesEchostructure?.map((s: any) => s.signe) || []
      },
      resultats: {
        acrScore: scan.acrScore,
        acrType: scan.acrType,
        conclusionIA: scan.conclusionIA,
        conduiteATenir: scan.conduiteATenir
      }
    };
  };

  useEffect(() => {
    if (scanId) {
      console.log("🔍 Récupération du scan ID:", scanId); // ✅ DEBUG
      axios.get(`http://localhost:9000/api/mammary-scan/${scanId}`)
        .then((response) => {
          const scan = response.data;
          console.log("📊 Scan récupéré complet:", scan); // ✅ DEBUG
          console.log("🎯 Score ACR trouvé:", scan.acrScore); // ✅ DEBUG
          console.log("🎯 Type ACR trouvé:", scan.acrType); // ✅ DEBUG
          
          setConclusionIA(scan.conclusionIA || "");
          setConduiteIA(scan.conduiteATenir || "");
          // On essaye de récupérer une justification si le backend en fournit une
          // (par exemple `justificationIA` ou `justification`).
          setJustificationIA(
            scan.justificationIA ||
            scan.justification ||
            ""
          );
          setAcrType(scan.acrType || "");
          setAcrScore(scan.acrScore || ""); // ✅ NOUVEAU : Récupérer le score ACR
          
          // ✅ NOUVEAU : Transformer les données pour le compte rendu médical
          const transformedData = transformScanDataForReport(scan);
          console.log("🔄 Données transformées pour le compte rendu:", transformedData); // ✅ DEBUG
          setScanData(transformedData);
          
          console.log("✅ États mis à jour - ACR Score:", scan.acrScore, "ACR Type:", scan.acrType); // ✅ DEBUG
          toast.success("Analyse IA récupérée ✅");
        })
        .catch((error) => {
          console.error("❌ Erreur récupération analyse IA:", error);
          toast.error("Erreur lors de la récupération du scan ❌");
        })
        .finally(() => {
          setLoadingIA(false);
        });
    }
  }, [scanId]);

  const handleSubmit = () => {
    navigate("/finalisation");
  };

  // ✅ NOUVEAUX : Fonctions pour le compte rendu médical
  const openMedicalReport = () => {
    setShowMedicalReport(true);
  };

  const closeMedicalReport = () => {
    setShowMedicalReport(false);
  };

  return {
    steps,
    conclusionIA,
    conduiteIA,
    justificationIA,
    acrType,
    acrScore, // ✅ NOUVEAU : Retourner le score ACR
    loadingIA,
    handleSubmit,
    // ✅ NOUVEAUX : Données et fonctions pour le compte rendu
    scanData,
    showMedicalReport,
    openMedicalReport,
    closeMedicalReport,
  };
};
