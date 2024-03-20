import { api } from "../../../infrastructure/http";
import { EnergyTypesResponseMock } from "../../../__mocks__/data/energyTypes";
import EnergyTypeService from "./energy-types";

describe("[Services]: Energy Types", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch a list of energy types correctly", async () => {
    const serviceSpy = vi.spyOn(EnergyTypeService, "getAll");
    const httpSpy = vi.spyOn(api, "get");

    const result = await EnergyTypeService.getAll();

    expect(serviceSpy).toHaveBeenCalled();
    expect(httpSpy).toHaveBeenCalledWith("/energy-types");
    expect(result).toEqual(EnergyTypesResponseMock);
  });
});
