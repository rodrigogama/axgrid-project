import { ICommonFormFields } from "../common/formFields";
import { IEnergy } from "../common/energy";

export interface IThermalEnergy extends IEnergy {
  formSchema: ICommonFormFields & {
    capacity: number;
    heatSourceStability: string;
    temperatureGradient: number;
    conversionEfficiency: number;
    location: string;
    environmentalImpactAndRegulation: string;
  };
}
