import { waitFor } from "@testing-library/react";
import { EnergyTypesResponseMock } from "../../../__mocks__/data/energyTypes";
import { server } from "../../../__mocks__/server";
import { getEnergyTypesHandler } from "../../../__mocks__/handlers";
import { renderQueryHook } from "../../../test-utils";
import { useGetEnergyTypes } from "./useGetEnergyTypes";

describe("[hooks]: useGetEnergyTypes", () => {
  beforeEach(() => {
    server.use(getEnergyTypesHandler.defaultHandler);
  });

  it("should fetch and return a list of energy types correctly", async () => {
    const { result } = renderQueryHook(() => useGetEnergyTypes());

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(EnergyTypesResponseMock);
  });

  it("should return an empty array when there is no data response from the api", async () => {
    server.use(getEnergyTypesHandler.noResponseHandler);
    const { result } = renderQueryHook(() => useGetEnergyTypes());

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual([]);
  });

  it("should return an empty array when there is an api error", async () => {
    server.use(getEnergyTypesHandler.errorHandler);
    const { result } = renderQueryHook(() => useGetEnergyTypes());

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.data).toEqual([]);
  });
});
