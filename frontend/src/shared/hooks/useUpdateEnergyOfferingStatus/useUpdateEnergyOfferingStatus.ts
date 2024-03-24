import { useMutation } from "react-query";
import { EnergyOfferingService } from "../../../services/api/energy-offerings";

export const useUpdateEnergyOfferingStatus = () => {
  const { mutate, ...mutation } = useMutation({
    mutationFn: (id: number) => {
      return EnergyOfferingService.update(id);
    },
  });

  return {
    onUpdate: mutate,
    ...mutation,
  };
};
