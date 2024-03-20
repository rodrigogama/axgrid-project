import { api } from "../../../infrastructure/http";
import { EnergyFormResponseMock } from "../../../__mocks__/data/energyForm";
import EnergyFormService from "./energy-form";

describe("[Services]: Energy Form", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch a form fields given an energy type id", async () => {
    const serviceSpy = vi.spyOn(EnergyFormService, "getById");
    const httpSpy = vi.spyOn(api, "get");
    const energyTypeId = "1";

    const result = await EnergyFormService.getById(energyTypeId);

    expect(serviceSpy).toHaveBeenCalled();
    expect(httpSpy).toHaveBeenCalledWith(
      `/energy-types/${energyTypeId}/offering-form`
    );
    expect(result).toEqual(EnergyFormResponseMock);
  });
});
