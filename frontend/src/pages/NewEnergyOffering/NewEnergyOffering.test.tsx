import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithRouterAndProviders } from "../../test-utils";
import { EnergyTypesResponseMock } from "../../__mocks__/data/energyTypes";
import { server } from "../../__mocks__/server";
import { NewEnergyOffering } from "./NewEnergyOffering";
import {
  getEnergyFormHandler,
  getEnergyTypesHandler,
} from "../../__mocks__/handlers";
import { EnergyFormResponseMock } from "../../__mocks__/data/energyForm";

describe("[pages]: New Energy Offering", () => {
  beforeEach(() => {
    server.use(getEnergyTypesHandler.defaultHandler);
    server.use(getEnergyFormHandler.defaultHandler);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render loading state correctly", () => {
    renderWithRouterAndProviders(<NewEnergyOffering />);

    expect(
      screen.getByRole("progressbar", { hidden: true })
    ).toBeInTheDocument();
  });

  it("should render error state correctly", async () => {
    server.use(getEnergyTypesHandler.errorHandler);
    renderWithRouterAndProviders(<NewEnergyOffering />);

    await waitFor(() => {
      expect(
        screen.getByText(
          "Something went wrong. Please, try again in a few moments."
        )
      ).toBeInTheDocument();
    });
  });

  it("should render the offering page correctly", async () => {
    renderWithRouterAndProviders(<NewEnergyOffering />);

    await waitFor(() => {
      expect(
        screen.getByText(
          "Select the Energy type you would like to create an offer"
        )
      ).toBeInTheDocument();
    });

    const select = screen.getByText("Select energy type");
    expect(select).toBeInTheDocument();

    await userEvent.click(select);
    expect(screen.getAllByRole("menuitem")).toHaveLength(
      EnergyTypesResponseMock.length
    );
  });

  it("should select an energy type and show its form fields", async () => {
    const optionToSelect = EnergyTypesResponseMock[0];
    renderWithRouterAndProviders(<NewEnergyOffering />);

    const select = await screen.findByText("Select energy type");
    await userEvent.click(select);

    await userEvent.click(screen.getByText(optionToSelect.name));

    expect(
      screen.getByText(EnergyFormResponseMock.formSchema.title)
    ).toBeInTheDocument();
    expect(
      screen.getByText(EnergyFormResponseMock.formSchema.description)
    ).toBeInTheDocument();
  });
});
