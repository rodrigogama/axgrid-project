import { useContext } from "react";
import { EnergyOfferingContext } from "../../contexts/EnergyOfferingContext";

export const useSelectedEnergyOffering = () => {
  const context = useContext(EnergyOfferingContext);

  if (context === undefined) {
    throw new Error(
      "useSelectedEnergyOffering must be used within an EnergyOfferingProvider"
    );
  }

  return context;
};
