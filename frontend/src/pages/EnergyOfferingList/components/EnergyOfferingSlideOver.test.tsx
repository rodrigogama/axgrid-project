import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EnergyOfferingListResponseMock } from "../../../__mocks__/data/energyOfferings";
import { EnergyTypesResponseMock } from "../../../__mocks__/data/energyTypes";
import { renderWithProviders } from "../../../test-utils";
import { useSelectedEnergyOffering } from "../../../shared/hooks/useSelectedEnergyOffering";
import { EnergyOfferingSlideOver } from "./EnergyOfferingSlideOver";

vi.mock("../../../shared/hooks/useSelectedEnergyOffering");

const offeringsMock = EnergyOfferingListResponseMock.map((offering) => ({
  ...offering,
  name: EnergyTypesResponseMock.find(
    (type) => type.id === offering.energyTypeId
  )!.name,
}));

const selectedOfferingMock = offeringsMock[0];

describe("[pages]: EnergyOfferingList > EnergyOfferingSlideOver", () => {
  const onCloseMock = vi.fn();
  const onSelectEnergyOfferingMock = vi.fn();

  beforeEach(() => {
    vi.mocked(useSelectedEnergyOffering, true).mockImplementation(() => ({
      selectedEnergyOffering: selectedOfferingMock,
      onSelectEnergyOffering: onSelectEnergyOfferingMock,
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render slide over with loading state", async () => {
    renderWithProviders(
      <EnergyOfferingSlideOver isOpen onClose={onCloseMock} />
    );

    expect(
      screen.getByText(`Energy Offering: ${selectedOfferingMock.name}`)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("progressbar", { hidden: true })
    ).toBeInTheDocument();
  });

  it("should render slide over with data correctly", async () => {
    renderWithProviders(
      <EnergyOfferingSlideOver isOpen onClose={onCloseMock} />
    );

    expect(await screen.findByText("Status")).toBeInTheDocument();
    expect(screen.getByText(selectedOfferingMock.status)).toBeInTheDocument();

    for (const fieldKey in selectedOfferingMock.fields) {
      expect(
        // @ts-expect-error ts(7053)
        screen.getByText(selectedOfferingMock.fields[fieldKey])
      ).toBeInTheDocument();
    }

    expect(screen.getByText("Close")).toBeInTheDocument();
    expect(screen.getByText("Buy Energy Offering")).toBeEnabled();
  });

  it("should call onClose callback when closing it", async () => {
    renderWithProviders(
      <EnergyOfferingSlideOver isOpen onClose={onCloseMock} />
    );

    expect(await screen.findByText("Status")).toBeInTheDocument();

    const closeButton = screen.getByText("Close");
    await userEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalled();
  });

  it("should show Buy Energy button disabled when energy offering is not OPEN", async () => {
    vi.mocked(useSelectedEnergyOffering, true).mockImplementation(() => ({
      selectedEnergyOffering: { ...selectedOfferingMock, status: "COMPLETED" },
      onSelectEnergyOffering: onSelectEnergyOfferingMock,
    }));

    renderWithProviders(
      <EnergyOfferingSlideOver isOpen onClose={onCloseMock} />
    );

    expect(await screen.findByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Buy Energy Offering")).toBeDisabled();
  });
});
