import { IGasEnergy } from "../gas";
import { IHydroEnergy } from "../hydro";
import { IKineticEnergy } from "../kinetic";
import { ISolarEnergy } from "../solar";
import { IThermalEnergy } from "../thermal";
import { IWindEnergy } from "../wind";

export interface ICommonFormFields {
  price: number;
  minimumPurchaseQuantity: number;
  contractTerms: string;
  paymentTerms: string;
}

export type EnergyFormFields =
  | ISolarEnergy
  | IWindEnergy
  | IHydroEnergy
  | IGasEnergy
  | IKineticEnergy
  | IThermalEnergy;

export interface IBaseField {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "select";
  placeholder?: string;
  unit?: string;
}

export interface ISelectField extends IBaseField {
  type: "select";
  options: Array<{
    label: string;
    value: string;
  }>;
}

export type FormField = IBaseField | ISelectField;
