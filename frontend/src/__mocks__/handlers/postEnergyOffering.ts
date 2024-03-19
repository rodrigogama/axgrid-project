import { http, HttpResponse } from "msw";
import { EnergyOfferingResponseMock } from "../data/energyOfferings";

const url = `${import.meta.env.VITE_API_BASE_URL}/energy-offerings`;

const defaultHandler = http.post(url, () => {
  return HttpResponse.json(EnergyOfferingResponseMock, { status: 201 });
});

const errorHandler = http.post(url, () => {
  return new HttpResponse(null, {
    status: 400,
    statusText: "Internal server error",
  });
});

export const postEnergyOfferingHandler = {
  defaultHandler,
  errorHandler,
};
