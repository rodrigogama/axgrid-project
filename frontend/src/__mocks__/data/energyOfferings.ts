import {
  EnergyOfferingRequest,
  EnergyOfferingResponse,
} from "../../services/api/energy-offerings";

export const EnergyOfferingRequestMock: EnergyOfferingRequest = {
  energyTypeId: "1",
  fields: {
    price: 100,
    minimumPurchaseQuantity: 10,
    contractTerms: "1 year, penalties apply for early termination",
    paymentTerms: "Monthly, post-delivery",
    capacity: 500,
    location: "California, USA",
    energyOutputPredictions: "Based on historical data and weather forecasts",
    timeOfAvailability: "Daylight hours",
    certifications: ["REC"],
  },
};

export const EnergyOfferingResponseMock: EnergyOfferingResponse = {
  id: 123,
  ...EnergyOfferingRequestMock,
};

export const EnergyOfferingListResponseMock: EnergyOfferingResponse[] = [
  EnergyOfferingResponseMock,
  { ...EnergyOfferingResponseMock, energyTypeId: "2", id: 321 },
];
