import { api } from "../../../infrastructure/http";
import {
  EnergyOfferingRequestMock,
  EnergyOfferingResponseMock,
} from "../../../__mocks__/data/energyOfferings";
import EnergyOfferingService from "./energy-offerings";

describe("[Services]: Energy Offerings", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch post an energy offering correctly", async () => {
    const serviceSpy = vi.spyOn(EnergyOfferingService, "save");
    const httpSpy = vi.spyOn(api, "post");

    const result = await EnergyOfferingService.save(EnergyOfferingRequestMock);

    expect(serviceSpy).toHaveBeenCalled();
    expect(httpSpy).toHaveBeenCalledWith(
      "/energy-offerings",
      EnergyOfferingRequestMock
    );
    expect(result).toEqual(EnergyOfferingResponseMock);
  });
});
