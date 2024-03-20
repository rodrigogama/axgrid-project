import { setupServer } from "msw/node";
import { getEnergyTypesHandler, postEnergyOfferingHandler } from "./handlers";

const handlers = [
  getEnergyTypesHandler.defaultHandler,
  postEnergyOfferingHandler.defaultHandler,
];

export const server = setupServer(...handlers);
