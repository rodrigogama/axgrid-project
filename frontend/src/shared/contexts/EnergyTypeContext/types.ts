import { IEnergy } from "../../../domains/common/energy";

export type TEnergyTypeContext = {
  selectedEnergyType: IEnergy | undefined;
  onSelectEnergyType: (energyType?: IEnergy) => void;
};
