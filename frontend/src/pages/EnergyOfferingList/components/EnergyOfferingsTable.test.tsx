import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EnergyOfferingListResponseMock } from "../../../__mocks__/data/energyOfferings";
import { EnergyTypesResponseMock } from "../../../__mocks__/data/energyTypes";
import { renderWithProviders } from "../../../test-utils";
import { EnergyOfferingsTable } from "./EnergyOfferingsTable";

const dataMocked = EnergyOfferingListResponseMock.map((offering) => ({
  ...offering,
  name: EnergyTypesResponseMock.find(
    (type) => type.id === offering.energyTypeId
  )!.name,
}));

const tableFields = [
  "price",
  "minimumPurchaseQuantity",
  "contractTerms",
  "paymentTerms",
];

describe("[pages]: EnergyOfferingList > EnergyOfferingsTable", () => {
  const onShowDetailsMock = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render table headers and data correctly", async () => {
    renderWithProviders(
      <EnergyOfferingsTable
        data={dataMocked}
        onShowDetailsClick={onShowDetailsMock}
      />
    );

    // check headers
    expect(screen.getByText("Energy Type")).toBeInTheDocument();
    expect(screen.getByText("Price (kWh, MWh)")).toBeInTheDocument();
    expect(screen.getByText("Min. Purchase Quantity")).toBeInTheDocument();
    expect(screen.getByText("Contract Terms")).toBeInTheDocument();
    expect(screen.getByText("Payment Terms")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();

    // check table data
    for (const dataRow of dataMocked) {
      const row = screen.getByTestId(`row_${dataRow.id}`);

      for (const fieldKey of tableFields) {
        expect(
          // @ts-expect-error 7053
          within(row).getByText(dataRow.fields[fieldKey])
        ).toBeInTheDocument();
      }

      expect(within(row).getByText(dataRow.name)).toBeInTheDocument();
      expect(within(row).getByText(dataRow.status)).toBeInTheDocument();
      expect(within(row).getByText("Show details")).toBeInTheDocument();
    }
  });

  it("should call callback when clicking on See details", async () => {
    renderWithProviders(
      <EnergyOfferingsTable
        data={dataMocked}
        onShowDetailsClick={onShowDetailsMock}
      />
    );

    const row = screen.getByTestId(`row_${dataMocked[0].id}`);
    const detailsButton = within(row).getByText("Show details");
    await userEvent.click(detailsButton);

    expect(onShowDetailsMock).toBeCalled();
  });
});
