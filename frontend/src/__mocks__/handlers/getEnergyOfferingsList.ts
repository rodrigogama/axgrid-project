import { http, HttpResponse } from "msw";
import { EnergyOfferingListResponseMock } from "../data/energyOfferings";

const url = `${import.meta.env.VITE_API_BASE_URL}/energy-offerings`;

const defaultHandler = http.get(url, () => {
  return HttpResponse.json(EnergyOfferingListResponseMock);
});

const noResponseHandler = http.get(url, () => {
  return HttpResponse.json(null);
});

const errorHandler = http.get(url, () => {
  return new HttpResponse(null, {
    status: 400,
    statusText: "Internal server error",
  });
});

export const getEnergyOfferingsListHandler = {
  defaultHandler,
  noResponseHandler,
  errorHandler,
};
