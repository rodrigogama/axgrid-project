import {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import { TEnergyOfferingContext } from "./types";

export const EnergyOfferingContext = createContext<
  TEnergyOfferingContext<any> | undefined
>(undefined);

export const EnergyOfferingProvider = ({ children }: PropsWithChildren) => {
  const [selectedEnergyOffering, setSelectedEnergyOffering] =
    useState<TEnergyOfferingContext<any>>();

  const onSelectEnergyOffering = useCallback(
    (energyType?: TEnergyOfferingContext<any>) => {
      setSelectedEnergyOffering(energyType);
    },
    []
  );

  const value = useMemo(
    () => ({ selectedEnergyOffering, onSelectEnergyOffering }),
    [selectedEnergyOffering, onSelectEnergyOffering]
  );

  return (
    <EnergyOfferingContext.Provider value={value}>
      {children}
    </EnergyOfferingContext.Provider>
  );
};
