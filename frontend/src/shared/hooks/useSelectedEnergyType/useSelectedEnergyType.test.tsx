import { renderHook, act } from "@testing-library/react";
import { renderQueryHook } from "../../../test-utils";
import { useSelectedEnergyType } from "./useSelectedEnergyType";
import { EnergyTypesResponseMock } from "../../../__mocks__/data/energyTypes";

describe("[hooks]: useSelectedEnergyType", () => {
  it("should select and unselect an energy type correctly", () => {
    const selectedEnergyType = EnergyTypesResponseMock[0];
    const { result } = renderQueryHook(() => useSelectedEnergyType());

    expect(result.current.selectedEnergyType).toBeUndefined();

    act(() => {
      result.current.onSelectEnergyType(selectedEnergyType);
    });
    expect(result.current.selectedEnergyType).toEqual(selectedEnergyType);

    act(() => {
      result.current.onSelectEnergyType();
    });
    expect(result.current.selectedEnergyType).toBeUndefined();
  });

  it("should throw an error when used outside of EnergyTypeProvider", () => {
    const renderWithoutProvider = () =>
      renderHook(() => useSelectedEnergyType());
    expect(renderWithoutProvider).toThrow(
      "useSelectedEnergyType must be used within an EnergyTypeProvider"
    );
  });
});
