import { api } from "../../../infrastructure/http";
import {
  EnergyOfferingListResponseMock,
  EnergyOfferingRequestMock,
  EnergyOfferingResponseMock,
  UpdateEnergyOfferingResponseMock,
} from "../../../__mocks__/data/energyOfferings";
import EnergyOfferingService from "./energy-offerings";

describe("[Services]: Energy Offerings", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch all energy offerings correctly", async () => {
    const serviceSpy = vi.spyOn(EnergyOfferingService, "getAll");
    const httpSpy = vi.spyOn(api, "get");

    const result = await EnergyOfferingService.getAll();

    expect(serviceSpy).toHaveBeenCalled();
    expect(httpSpy).toHaveBeenCalledWith("/energy-offerings");
    expect(result).toEqual(EnergyOfferingListResponseMock);
  });

  it("should post an energy offering correctly", async () => {
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

  it("should update an energy offering correctly", async () => {
    const serviceSpy = vi.spyOn(EnergyOfferingService, "update");
    const httpSpy = vi.spyOn(api, "post");

    const result = await EnergyOfferingService.update("1");

    expect(serviceSpy).toHaveBeenCalled();
    expect(httpSpy).toHaveBeenCalledWith("/energy-offerings/1/buy", {});
    expect(result).toEqual(UpdateEnergyOfferingResponseMock);
  });
});
