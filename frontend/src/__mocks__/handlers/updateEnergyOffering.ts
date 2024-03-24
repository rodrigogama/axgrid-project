import { http, HttpResponse } from "msw";
import { UpdateEnergyOfferingResponseMock } from "../data/energyOfferings";

const url = `${import.meta.env.VITE_API_BASE_URL}/energy-offerings/:id/buy`;

const defaultHandler = http.post(url, () => {
  return HttpResponse.json(UpdateEnergyOfferingResponseMock, { status: 200 });
});

const errorHandler = http.post(url, () => {
  return new HttpResponse(null, {
    status: 400,
    statusText: "Internal server error",
  });
});

export const updateEnergyOfferingHandler = {
  defaultHandler,
  errorHandler,
};
