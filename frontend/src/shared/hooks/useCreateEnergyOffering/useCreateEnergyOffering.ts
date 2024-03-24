import { useMutation } from "react-query";
import {
  EnergyOfferingService,
  EnergyOfferingRequest,
} from "../../../services/api/energy-offerings";

export const useCreateEnergyOffering = () => {
  const { mutate, ...mutation } = useMutation({
    mutationFn: ({ data }: Props) => {
      return EnergyOfferingService.save(data);
    },
  });

  return {
    onCreate: mutate,
    ...mutation,
  };
};

type Props = {
  data: EnergyOfferingRequest;
};
