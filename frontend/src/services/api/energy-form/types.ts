import { IEnergy } from "../../../domains/common/energy";
import { FormField } from "../../../domains/common/formFields";

export type EnergyFormResponse = IEnergy & {
  formSchema: {
    title: string;
    description: string;
    fields: FormField[];
  };
};
