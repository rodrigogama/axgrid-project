import { api } from "../../../infrastructure/http";
import { EnergyTypesResponse } from "./types";

class EnergyTypeService {
  async getAll(): Promise<EnergyTypesResponse> {
    return api
      .get<EnergyTypesResponse>("/energy-types")
      .then((response) => response.data);
  }
}

const instance = new EnergyTypeService();
export default instance;
