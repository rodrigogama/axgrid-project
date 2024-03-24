import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { socketClient } from "../../../infrastructure/socket";
import { useGetEnergyOfferings } from "../useGetEnergyOfferings";
import { QUERY_KEYS, REAL_TIME_EVENT_NAMES } from "../../constants";

export const useEnergyOfferings = () => {
  const queryClient = useQueryClient();
  const { data, ...queryInfo } = useGetEnergyOfferings();

  useEffect(() => {
    const handleNewOffering = (newOffering: (typeof data)[number]) => {
      queryClient.setQueryData(
        [QUERY_KEYS.ENERGY_OFFERINGS_LIST],
        (oldData: typeof data | undefined) => {
          return [...(oldData ?? []), newOffering];
        }
      );
    };

    const handleOfferingStatusUpdated = (
      updatedOffering: (typeof data)[number]
    ) => {
      queryClient.setQueryData(
        [QUERY_KEYS.ENERGY_OFFERINGS_LIST],
        (queryData: typeof data | undefined) => {
          if (!queryData) return [];

          return queryData.map((offering) =>
            offering.id === updatedOffering.id ? updatedOffering : offering
          );
        }
      );
    };

    socketClient.subscribe(
      REAL_TIME_EVENT_NAMES.NEW_OFFERING,
      handleNewOffering
    );
    socketClient.subscribe(
      REAL_TIME_EVENT_NAMES.STATUS_PROCESSING,
      handleOfferingStatusUpdated
    );
    socketClient.subscribe(
      REAL_TIME_EVENT_NAMES.STATUS_ACCEPTED,
      handleOfferingStatusUpdated
    );

    return () => {
      socketClient.unsubscribe(REAL_TIME_EVENT_NAMES.NEW_OFFERING);
      socketClient.unsubscribe(REAL_TIME_EVENT_NAMES.STATUS_PROCESSING);
      socketClient.unsubscribe(REAL_TIME_EVENT_NAMES.STATUS_ACCEPTED);
    };
  }, [queryClient]);

  return { data, ...queryInfo };
};
