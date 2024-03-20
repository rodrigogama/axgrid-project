import { waitFor } from "@testing-library/react";
import { EnergyFormResponseMock } from "../../../__mocks__/data/energyForm";
import { server } from "../../../__mocks__/server";
import { getEnergyFormHandler } from "../../../__mocks__/handlers";
import { renderQueryHook } from "../../../test-utils";
import { EnergyFormService } from "../../../services/api/energy-form";
import { useGetEnergyForm } from "./useGetEnergyForm";

describe("[hooks]: useGetEnergyForm", () => {
  beforeEach(() => {
    server.use(getEnergyFormHandler.defaultHandler);
  });

  it("should fetch and return form fields given an energy type id", async () => {
    const { result } = renderQueryHook(() => useGetEnergyForm("1"));

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(EnergyFormResponseMock);
  });

  it("should return an empty array when there is no data response from the api", async () => {
    const serviceSpy = vi.spyOn(EnergyFormService, "getById");
    renderQueryHook(() => useGetEnergyForm(undefined));

    expect(serviceSpy).not.toHaveBeenCalled();
  });
});
