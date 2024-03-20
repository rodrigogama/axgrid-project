import { IGasEnergy } from "../../../domains/gas";
import { IHydroEnergy } from "../../../domains/hydro";
import { IKineticEnergy } from "../../../domains/kinetic";
import { ISolarEnergy } from "../../../domains/solar";
import { IThermalEnergy } from "../../../domains/thermal";
import { IWindEnergy } from "../../../domains/wind";

export type EnergyFormFields =
  | ISolarEnergy
  | IWindEnergy
  | IHydroEnergy
  | IGasEnergy
  | IKineticEnergy
  | IThermalEnergy;

export type EnergyOfferingRequest = {
  energyTypeId: EnergyFormFields["id"];
  fields: EnergyFormFields["formSchema"];
};

export type EnergyOfferingResponse = {
  id: number;
} & EnergyOfferingRequest;
