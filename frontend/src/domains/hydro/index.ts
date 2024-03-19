import { ICommonFormFields } from "../common/formFields";
import { IEnergy } from "../common/energy";

export interface IHydroEnergy extends IEnergy {
  formSchema: ICommonFormFields & {
    capacity: number;
    waterFlowRate: number;
    reservoirLevel: number;
    regulatoryCompliance: string;
    flexibilityOfSupply: string;
    energyStorage: string;
  };
}
