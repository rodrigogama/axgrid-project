import { ICommonFormFields } from "../common/formFields";
import { IEnergy } from "../common/energy";

export interface IGasEnergy extends IEnergy {
  formSchema: ICommonFormFields & {
    capacity: number;
    location: string;
    deliveryMethod: string;
    flexibilityOfSupply: string;
    emissionCreditsOrPenalties: string;
    contractLength: string;
  };
}
