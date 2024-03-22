import {
  EnergyFormFields,
  EnergyFormSchemas,
} from "../../../domains/common/formFields";

export type EnergyOfferingRequest = {
  energyTypeId: EnergyFormSchemas["id"];
  fields: EnergyFormFields;
};

export type EnergyOfferingResponse = {
  id: number;
  status: "PENDING" | "ACCEPTED" | "OPEN";
} & EnergyOfferingRequest;
