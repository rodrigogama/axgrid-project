import { act } from "@testing-library/react-hooks";
import { renderQueryHook } from "../../../test-utils";
import { EnergyOfferingRequestMock } from "../../../__mocks__/data/energyOfferings";
import { EnergyOfferingService } from "../../../services/api/energy-offerings";
import { useCreateEnergyOffering } from "./useCreateEnergyOffering";

describe("[hooks]: useCreateEnergyOffering", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should call create energy offering and invalidates query cache on success", async () => {
    const serviceSpy = vi.spyOn(EnergyOfferingService, "save");

    // render the hook
    const { result } = renderQueryHook(() => useCreateEnergyOffering());
    const data = EnergyOfferingRequestMock;

    await act(() => {
      result.current.onCreate({ data });
    });

    expect(serviceSpy).toHaveBeenCalledWith(data);
  });
});
