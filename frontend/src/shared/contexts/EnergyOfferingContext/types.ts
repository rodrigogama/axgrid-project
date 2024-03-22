export type TEnergyOfferingContext<T> = {
  selectedEnergyOffering: T | undefined;
  onSelectEnergyOffering: (offering?: T) => void;
};
