import { waitFor } from "@testing-library/react";
import { EnergyOfferingListResponseMock } from "../../../__mocks__/data/energyOfferings";
import { server } from "../../../__mocks__/server";
import { getEnergyOfferingsListHandler } from "../../../__mocks__/handlers";
import { renderQueryHook } from "../../../test-utils";
import { useGetEnergyOfferings } from "./useGetEnergyOfferings";

describe("[hooks]: useGetEnergyOfferings", () => {
  beforeEach(() => {
    server.use(getEnergyOfferingsListHandler.defaultHandler);
  });

  it("should fetch and return a list of energy offerings correctly", async () => {
    const { result } = renderQueryHook(() => useGetEnergyOfferings());

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(EnergyOfferingListResponseMock);
  });

  it("should return an empty array when there is no data response from the api", async () => {
    server.use(getEnergyOfferingsListHandler.noResponseHandler);
    const { result } = renderQueryHook(() => useGetEnergyOfferings());

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual([]);
  });

  it("should return an empty array when there is an api error", async () => {
    server.use(getEnergyOfferingsListHandler.errorHandler);
    const { result } = renderQueryHook(() => useGetEnergyOfferings());

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.data).toEqual([]);
  });
});
