import { http, HttpResponse } from "msw";
import { EnergyTypesResponseMock } from "../data/energyTypes";

const url = `${import.meta.env.VITE_API_BASE_URL}/energy-types`;

const defaultHandler = http.get(url, () => {
  return HttpResponse.json(EnergyTypesResponseMock);
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

export const getEnergyTypesHandler = {
  defaultHandler,
  noResponseHandler,
  errorHandler,
};
