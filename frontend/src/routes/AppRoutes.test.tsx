import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";

vi.mock("../pages/EnergyOfferingList", () => ({
  EnergyOfferingListPage: () => <div>Energy Offerings Page</div>,
}));

vi.mock("../pages/NewEnergyOffering", () => ({
  NewEnergyOfferingPage: () => <div>New Energy Offering</div>,
}));

describe("[Routes]: AppRoutes", () => {
  it("should render EnergyOfferingListPage for /energy-deals route", () => {
    render(
      <MemoryRouter initialEntries={["/energy-deals"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText("Energy Offerings Page")).toBeInTheDocument();
  });

  it("should render EnergyOfferingListPage for /energy-deals/new route", () => {
    render(
      <MemoryRouter initialEntries={["/energy-deals/new"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText("New Energy Offering")).toBeInTheDocument();
  });

  it("should redirect to default path route from the index route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText("Energy Offerings Page")).toBeInTheDocument();
  });
});
