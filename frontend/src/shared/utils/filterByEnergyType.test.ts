import { EnergyOfferingResponse } from "../../services/api/energy-offerings";
import { filterByEnergyType } from "./filterByEnergyType";

describe("[utils]: filterByEnergyType", () => {
  const energyOfferingsMock = [
    { energyTypeId: "1" },
    { energyTypeId: "1" },
    { energyTypeId: "2" },
    { energyTypeId: "3" },
    { energyTypeId: "4" },
    { energyTypeId: "5" },
  ] as EnergyOfferingResponse[];

  describe("filterByEnergyType", () => {
    it("should filter energy offerings by energy type", () => {
      const energyTypeIds = ["1", "2"];
      const expected = [
        energyOfferingsMock[0],
        energyOfferingsMock[1],
        energyOfferingsMock[2],
      ];

      const filtered = filterByEnergyType(energyOfferingsMock, energyTypeIds);
      expect(filtered).toEqual(expected);
    });

    it("should return all energy offerings when energy types array is empty", () => {
      const energyTypeIds: string[] = [];
      const filtered = filterByEnergyType(energyOfferingsMock, energyTypeIds);
      expect(filtered).toEqual(energyOfferingsMock);
    });
  });
});
