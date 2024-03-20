import { useQuery } from "react-query";
import { EnergyFormService } from "../../../services/api/energy-form";
import { QUERY_KEYS } from "../../constants";

export const useGetEnergyForm = (energyTypeId: string | undefined) => {
  const { data, ...rest } = useQuery({
    queryKey: [QUERY_KEYS.ENERGY_FORM_FIELDS, energyTypeId],
    queryFn: () => EnergyFormService.getById(energyTypeId as string),
    enabled: energyTypeId !== undefined,
  });

  return {
    data,
    ...rest,
  };
};
