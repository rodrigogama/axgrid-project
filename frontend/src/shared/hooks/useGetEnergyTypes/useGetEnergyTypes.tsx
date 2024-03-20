import { useQuery } from "react-query";
import { EnergyTypeService } from "../../../services/api/energy-types";
import { QUERY_KEYS } from "../../constants";

export const useGetEnergyTypes = () => {
  const { data, ...rest } = useQuery({
    queryKey: [QUERY_KEYS.ENERGY_TYPES_LIST],
    queryFn: () => EnergyTypeService.getAll(),
  });

  return {
    data: data ?? [],
    ...rest,
  };
};
