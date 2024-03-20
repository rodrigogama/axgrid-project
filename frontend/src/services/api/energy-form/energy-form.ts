import { api } from "../../../infrastructure/http";
import { EnergyFormResponse } from "./types";

class EnergyFormService {
  async getById(energyTypeId: string): Promise<EnergyFormResponse> {
    return api
      .get<EnergyFormResponse>(`/energy-types/${energyTypeId}/offering-form`)
      .then((response) => response.data);
  }
}

const instance = new EnergyFormService();
export default instance;
