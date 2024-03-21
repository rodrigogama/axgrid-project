import {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import { TEnergyTypeContext } from "./types";

export const EnergyTypeContext = createContext<TEnergyTypeContext | undefined>(
  undefined
);

export const EnergyTypeProvider = ({ children }: PropsWithChildren) => {
  const [selectedEnergyType, setSelectedEnergyType] =
    useState<TEnergyTypeContext["selectedEnergyType"]>();

  const onSelectEnergyType = useCallback(
    (energyType: TEnergyTypeContext["selectedEnergyType"]) => {
      setSelectedEnergyType(energyType);
    },
    []
  );

  const value = useMemo(
    () => ({ selectedEnergyType, onSelectEnergyType }),
    [selectedEnergyType, onSelectEnergyType]
  );

  return (
    <EnergyTypeContext.Provider value={value}>
      {children}
    </EnergyTypeContext.Provider>
  );
};
