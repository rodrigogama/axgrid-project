import { useMutation, useQueryClient } from "react-query";
import {
  EnergyOfferingService,
  EnergyOfferingRequest,
} from "../../../services/api/energy-offerings";
import { QUERY_KEYS } from "../../constants";

export const useCreateEnergyOffering = () => {
  const queryClient = useQueryClient();

  const { mutate, ...mutation } = useMutation({
    mutationFn: ({ data }: Props) => {
      return EnergyOfferingService.save(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ENERGY_OFFERINGS_LIST],
      });
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
