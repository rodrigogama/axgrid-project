import { setupServer } from "msw/node";
import {
  getEnergyTypesHandler,
  getEnergyFormHandler,
  postEnergyOfferingHandler,
} from "./handlers";

const handlers = [
  getEnergyTypesHandler.defaultHandler,
  getEnergyFormHandler.defaultHandler,
  postEnergyOfferingHandler.defaultHandler,
];

export const server = setupServer(...handlers);
