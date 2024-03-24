import { act } from "@testing-library/react-hooks";
import { renderQueryHook } from "../../../test-utils";
import { EnergyOfferingService } from "../../../services/api/energy-offerings";
import { useUpdateEnergyOffering } from "./useUpdateEnergyOffering";

describe("[hooks]: useUpdateEnergyOffering", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should call update energy offering", async () => {
    const serviceSpy = vi.spyOn(EnergyOfferingService, "update");
    const { result } = renderQueryHook(() => useUpdateEnergyOffering());

    await act(() => {
      result.current.onUpdate({ id: 123 });
    });

    expect(serviceSpy).toHaveBeenCalledWith(123);
  });
});
