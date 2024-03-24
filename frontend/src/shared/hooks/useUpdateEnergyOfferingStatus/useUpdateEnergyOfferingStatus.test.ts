import { act } from "@testing-library/react-hooks";
import { renderQueryHook } from "../../../test-utils";
import { EnergyOfferingService } from "../../../services/api/energy-offerings";
import { useUpdateEnergyOfferingStatus } from "./useUpdateEnergyOfferingStatus";

describe("[hooks]: useUpdateEnergyOfferingStatus", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should call update energy offering", async () => {
    const serviceSpy = vi.spyOn(EnergyOfferingService, "update");
    const { result } = renderQueryHook(() => useUpdateEnergyOfferingStatus());

    await act(() => {
      result.current.onUpdate(123);
    });

    expect(serviceSpy).toHaveBeenCalledWith(123);
  });
});
