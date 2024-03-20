import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";

vi.mock("../pages/EnergyOfferingList", () => ({
  EnergyOfferingListPage: () => <div>Energy Offerings Page</div>,
}));

describe("[Routes]: AppRoutes", () => {
  it("should render EnergyOfferingListPage for /energy-offerings route", () => {
    render(
      <MemoryRouter initialEntries={["/energy-offerings"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText("Energy Offerings Page")).toBeInTheDocument();
  });

  it("should redirects to /energy-offerings from the index route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText("Energy Offerings Page")).toBeInTheDocument();
  });
});
