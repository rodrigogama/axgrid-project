import { api } from "../../../infrastructure/http";
import { EnergyOfferingRequest, EnergyOfferingResponse } from "./types";

class EnergyOfferingService {
  async getAll(): Promise<EnergyOfferingResponse[]> {
    return api
      .get<EnergyOfferingResponse[]>("/energy-offerings")
      .then((response) => response.data);
  }

  async save(request: EnergyOfferingRequest): Promise<EnergyOfferingResponse> {
    const { energyTypeId, fields } = request;
    return api
      .post<EnergyOfferingRequest, EnergyOfferingResponse>(
        "/energy-offerings",
        { energyTypeId, fields }
      )
      .then((response) => response.data);
  }

  async update(id: number): Promise<EnergyOfferingResponse> {
    return api
      .post<null, EnergyOfferingResponse>(`/energy-offerings/${id}/buy`, {})
      .then((response) => response.data);
  }
}

const instance = new EnergyOfferingService();
export default instance;
