import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithRouterAndProviders } from "../../test-utils";
import {
  getEnergyFormHandler,
  getEnergyTypesHandler,
} from "../../__mocks__/handlers";
import { EnergyFormResponseMock } from "../../__mocks__/data/energyForm";
import { EnergyTypesResponseMock } from "../../__mocks__/data/energyTypes";
import { server } from "../../__mocks__/server";
import { EnergyOfferingList } from "./EnergyOfferingList";

describe("[pages]: EnergyOfferingList", () => {
  beforeEach(() => {
    server.use(getEnergyTypesHandler.defaultHandler);
    server.use(getEnergyFormHandler.defaultHandler);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render loading state correctly", () => {
    renderWithRouterAndProviders(<EnergyOfferingList />);

    expect(
      screen.getByRole("progressbar", { hidden: true })
    ).toBeInTheDocument();
  });

  it("should render error state correctly", async () => {
    server.use(getEnergyTypesHandler.errorHandler);
    renderWithRouterAndProviders(<EnergyOfferingList />);

    expect(
      await screen.findByText(
        "Something went wrong. Please, try again in a few moments."
      )
    ).toBeInTheDocument();
  });

  it("should show info message when filtering has no results", async () => {
    renderWithRouterAndProviders(<EnergyOfferingList />);

    const filtersButton = await screen.findByText("Filters");
    await userEvent.click(filtersButton);

    const thermalFilter = await screen.findByText("Thermal");
    await userEvent.click(thermalFilter);

    const noResultsMessage =
      "Oops! Looks like your search did not return any result.";
    expect(await screen.findByText(noResultsMessage)).toBeInTheDocument();
  });
});
