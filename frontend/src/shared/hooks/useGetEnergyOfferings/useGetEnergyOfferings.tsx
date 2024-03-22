import { useQuery } from "react-query";
import { EnergyOfferingService } from "../../../services/api/energy-offerings";
import { QUERY_KEYS } from "../../constants";

export const useGetEnergyOfferings = () => {
  const { data, ...rest } = useQuery({
    queryKey: [QUERY_KEYS.ENERGY_OFFERINGS_LIST],
    queryFn: () => EnergyOfferingService.getAll(),
  });

  return {
    data: data ?? [],
    ...rest,
  };
};
