import { ICommonFormFields } from "../common/formFields";
import { IEnergy } from "../common/energy";

export interface IWindEnergy extends IEnergy {
  formSchema: ICommonFormFields & {
    capacity: number;
    location: string;
    windSpeedPredictions: string;
    turbineEfficiency: number;
    timeOfAvailability: string;
    certifications: string[];
  };
}
