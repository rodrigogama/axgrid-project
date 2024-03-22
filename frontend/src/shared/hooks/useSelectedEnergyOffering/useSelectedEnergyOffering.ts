import { useContext } from "react";
import { EnergyOfferingContext } from "../../contexts/EnergyOfferingContext";
import { TEnergyOfferingContext } from "../../contexts/EnergyOfferingContext/types";

export const useSelectedEnergyOffering = <T>() => {
  const context = useContext<TEnergyOfferingContext<T> | undefined>(
    EnergyOfferingContext
  );

  if (context === undefined) {
    throw new Error(
      "useSelectedEnergyOffering must be used within an EnergyOfferingProvider"
    );
  }

  return context;
};
