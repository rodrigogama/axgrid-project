import { EnergyOfferingResponse } from "../../services/api/energy-offerings";

export const filterByEnergyType = (
  energyOfferings: EnergyOfferingResponse[],
  energyTypeIds: string[]
) => {
  if (energyTypeIds.length === 0) return energyOfferings;

  return energyOfferings.filter((energyOffering) =>
    energyTypeIds.includes(energyOffering.energyTypeId)
  );
};
