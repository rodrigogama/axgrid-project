import { useCallback, useMemo, useState } from "react";
import { IEnergy } from "../../domains/common/energy";
import { useGetEnergyTypes } from "../../shared/hooks/useGetEnergyTypes";
import { useEnergyOfferings } from "../../shared/hooks/useEnergyOfferings";
import { filterByEnergyType } from "../../shared/utils/filterByEnergyType";
import { Alert } from "../../components/lib/Alert";
import { PageShell } from "../../components/PageShell";
import { EnergyTypesFilter } from "./components/EnergyTypeFilter";
import { EnergyOfferingsTable } from "./components/EnergyOfferingsTable";
import { EnergyOfferingSlideOver } from "./components/EnergyOfferingSlideOver";

export const EnergyOfferingList = () => {
  const [isSlideOpen, setIsSlideOpen] = useState(false);
  const [selectedEnergyTypes, setSelectedEnergyTypes] = useState<IEnergy[]>([]);

  const {
    data: energyTypes,
    isLoading: isLoadingEnergyTypes,
    isError: isEnergyTypesError,
  } = useGetEnergyTypes();

  const {
    data: energyOfferings,
    isLoading: isLoadingEnergyOfferings,
    isError: isEnergyOfferingsError,
  } = useEnergyOfferings();

  const getEnergyTypeName = useCallback(
    (energyTypeId: string) => {
      return energyTypes.find((energyType) => energyType.id === energyTypeId)
        ?.name;
    },
    [energyTypes]
  );

  const isPageLoading = isLoadingEnergyTypes || isLoadingEnergyOfferings;
  const isPageError = isEnergyTypesError || isEnergyOfferingsError;

  const filteredOfferings = useMemo(() => {
    const ids = selectedEnergyTypes.map((energy) => energy.id);

    return filterByEnergyType(energyOfferings, ids).map((item) => ({
      ...item,
      name: getEnergyTypeName(item.energyTypeId) as string,
    }));
  }, [energyOfferings, selectedEnergyTypes, getEnergyTypeName]);

  return (
    <PageShell
      title="Energy Offerings"
      isLoading={isPageLoading}
      isError={isPageError}
    >
      <EnergyTypesFilter
        options={energyTypes}
        onSelect={setSelectedEnergyTypes}
      />

      <div className="inline-block min-w-full pt-8 align-middle">
        {filteredOfferings.length === 0 && (
          <Alert
            variant="info"
            message="Oops! Looks like your search did not return any result."
            className="max-w-max mx-auto"
          />
        )}

        {filteredOfferings.length > 0 && (
          <>
            <EnergyOfferingsTable
              data={filteredOfferings}
              onShowDetailsClick={() => setIsSlideOpen(true)}
            />

            <EnergyOfferingSlideOver
              isOpen={isSlideOpen}
              onClose={() => setIsSlideOpen(false)}
            />
          </>
        )}
      </div>
    </PageShell>
  );
};
