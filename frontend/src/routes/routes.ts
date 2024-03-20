import { EnergyOfferingListPage } from "../pages/EnergyOfferingList";
import { NewEnergyOfferingPage } from "../pages/NewEnergyOffering";

export const protectedRoutes = [
  {
    id: "energy-deals",
    path: "/energy-deals",
    pageElement: EnergyOfferingListPage,
    displayName: "Energy Deals",
    default: true,
  },
  {
    id: "new-energy-deal",
    path: "/energy-deals/new",
    pageElement: NewEnergyOfferingPage,
    displayName: "Create Offering",
  },
];
