import { useContext } from "react";
import { EnergyTypeContext } from "../../contexts/EnergyTypeContext";

export const useSelectedEnergyType = () => {
  const context = useContext(EnergyTypeContext);

  if (context === undefined) {
    throw new Error(
      "useSelectedEnergyType must be used within an EnergyTypeProvider"
    );
  }

  return context;
};
