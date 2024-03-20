import { http, HttpResponse } from "msw";
import { EnergyFormResponseMock } from "../data/energyForm";

const url = `${
  import.meta.env.VITE_API_BASE_URL
}/energy-types/:energyTypeId/offering-form`;

const defaultHandler = http.get(url, () => {
  return HttpResponse.json(EnergyFormResponseMock);
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

export const getEnergyFormHandler = {
  defaultHandler,
  noResponseHandler,
  errorHandler,
};
