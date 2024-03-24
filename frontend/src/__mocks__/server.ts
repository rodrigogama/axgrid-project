import { setupServer } from "msw/node";
import {
  getEnergyTypesHandler,
  getEnergyFormHandler,
  getEnergyOfferingsListHandler,
  postEnergyOfferingHandler,
  updateEnergyOfferingHandler,
} from "./handlers";

const handlers = [
  getEnergyTypesHandler.defaultHandler,
  getEnergyFormHandler.defaultHandler,
  getEnergyOfferingsListHandler.defaultHandler,
  postEnergyOfferingHandler.defaultHandler,
  updateEnergyOfferingHandler.defaultHandler,
];

export const server = setupServer(...handlers);
