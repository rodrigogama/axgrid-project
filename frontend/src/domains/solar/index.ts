import { ICommonFormFields } from "../common/formFields";
import { IEnergy } from "../common/energy";

export interface ISolarEnergy extends IEnergy {
  formSchema: ICommonFormFields & {
    capacity: number;
    location: string;
    energyOutputPredictions: string;
    timeOfAvailability: string;
    certifications: string[];
  };
}
