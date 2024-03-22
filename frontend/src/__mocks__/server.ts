import { setupServer } from "msw/node";
import {
  getEnergyTypesHandler,
  getEnergyFormHandler,
  getEnergyOfferingsListHandler,
  postEnergyOfferingHandler,
} from "./handlers";

const handlers = [
  getEnergyTypesHandler.defaultHandler,
  getEnergyFormHandler.defaultHandler,
  getEnergyOfferingsListHandler.defaultHandler,
  postEnergyOfferingHandler.defaultHandler,
];

export const server = setupServer(...handlers);
