import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

export const useFormThreeLogic = (navigate: ReturnType<typeof useNavigate>) => {
  const location = useLocation();
  const { scanId } = location.state || {};

  const [conclusionIA, setConclusionIA] = useState<string>("");
  const [conduiteIA, setConduiteIA] = useState<string>("");
  const [loadingIA, setLoadingIA] = useState<boolean>(true);

  const steps = [
    { title: "Mammographie", status: "completed" as const },
    { title: "Échographie", status: "completed" as const },
    { title: "Conclusion", status: "in-progress" as const },
  ];

  useEffect(() => {
    if (scanId) {
      axios.get(`http://localhost:9000/api/mammary-scan/${scanId}`)
        .then((response) => {
          const scan = response.data;
console.log("Scan récupéré:", scan);
          setConclusionIA(scan.conclusionIA || "");
          setConduiteIA(scan.conduiteATenir || "");
          toast.success("Analyse IA récupérée ✅");
        })
        .catch((error) => {
          console.error("Erreur récupération analyse IA:", error);
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

  return {
    steps,
    conclusionIA,
    conduiteIA,
    loadingIA,
    handleSubmit,
  };
};
