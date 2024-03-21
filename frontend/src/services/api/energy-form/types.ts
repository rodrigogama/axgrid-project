import { IEnergy } from "../../../domains/common/energy";
import { FormSchema } from "../../../domains/common/formFields";

export type EnergyFormResponse = IEnergy & {
  formSchema: FormSchema;
};
