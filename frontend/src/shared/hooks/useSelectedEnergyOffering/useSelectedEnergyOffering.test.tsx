import { renderHook, act } from "@testing-library/react";
import { renderQueryHook } from "../../../test-utils";
import { EnergyOfferingResponseMock } from "../../../__mocks__/data/energyOfferings";
import { useSelectedEnergyOffering } from "./useSelectedEnergyOffering";

describe("[hooks]: useSelectedEnergyOffering", () => {
  it("should select and unselect an energy type correctly", () => {
    const { result } = renderQueryHook(() => useSelectedEnergyOffering());

    expect(result.current.selectedEnergyOffering).toBeUndefined();

    act(() => {
      result.current.onSelectEnergyOffering(EnergyOfferingResponseMock);
    });
    expect(result.current.selectedEnergyOffering).toEqual(
      EnergyOfferingResponseMock
    );

    act(() => {
      result.current.onSelectEnergyOffering();
    });
    expect(result.current.selectedEnergyOffering).toBeUndefined();
  });

  it("should throw an error when used outside of EnergyOfferingProvider", () => {
    const renderWithoutProvider = () =>
      renderHook(() => useSelectedEnergyOffering());
    expect(renderWithoutProvider).toThrow(
      "useSelectedEnergyOffering must be used within an EnergyOfferingProvider"
    );
  });
});
