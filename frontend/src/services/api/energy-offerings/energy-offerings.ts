import { api } from "../../../infrastructure/http";
import { EnergyOfferingRequest, EnergyOfferingResponse } from "./types";

class EnergyOfferingService {
  async save(request: EnergyOfferingRequest): Promise<EnergyOfferingResponse> {
    const { energyTypeId, fields } = request;
    return api
      .post<EnergyOfferingRequest, EnergyOfferingResponse>(
        "/energy-offerings",
        { energyTypeId, fields }
      )
      .then((response) => response.data);
  }
}

const instance = new EnergyOfferingService();
export default instance;
