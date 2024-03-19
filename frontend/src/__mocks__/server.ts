import { setupServer } from "msw/node";
import { postEnergyOfferingHandler } from "./handlers";

const handlers = [postEnergyOfferingHandler.defaultHandler];

export const server = setupServer(...handlers);
