import { EnergyFormFields } from "../../../domains/common/formFields";

export type EnergyOfferingRequest = {
  energyTypeId: EnergyFormFields["id"];
  fields: EnergyFormFields["formSchema"];
};

export type EnergyOfferingResponse = {
  id: number;
} & EnergyOfferingRequest;
