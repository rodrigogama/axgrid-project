import { ICommonFormFields } from "../common/formFields";
import { IEnergy } from "../common/energy";

export interface IKineticEnergy extends IEnergy {
  formSchema: ICommonFormFields & {
    capacity: number;
    location: string;
    energyConversionEfficiency: number;
    predictabilityOfSource: string;
  };
}
