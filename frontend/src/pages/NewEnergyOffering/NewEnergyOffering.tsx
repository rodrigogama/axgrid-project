import { useMemo } from "react";
import { useGetEnergyTypes } from "../../shared/hooks/useGetEnergyTypes";
import { useGetEnergyForm } from "../../shared/hooks/useGetEnergyForm";
import { Select, SelectOption } from "../../components/lib/Select";
import { Spinner } from "../../components/lib/Spinner";
import { PageShell } from "../../components/PageShell";
import { DynamicForm } from "../../components/DynamicForm";
import { useSelectedEnergyType } from "../../shared/hooks/useSelectedEnergyType";

export const NewEnergyOffering = () => {
  const { selectedEnergyType, onSelectEnergyType } = useSelectedEnergyType();

  const { data: energyTypes, isLoading, isError } = useGetEnergyTypes();
  const { data: energyForm, isLoading: isLoadingEnergyForm } = useGetEnergyForm(
    selectedEnergyType?.id
  );

  const handleEnergyTypeSelect = (selectedOption: SelectOption | undefined) => {
    const energyType = energyTypes.find(
      (energyType) => energyType.id === selectedOption?.value
    );
    onSelectEnergyType(energyType);
  };

  const energyTypesOptions = useMemo(() => {
    return energyTypes.map((energyType) => ({
      label: energyType.name,
      value: energyType.id,
    }));
  }, [energyTypes]);

  const selectedEnergyTypeOption = useMemo(() => {
    return energyTypesOptions.find(
      (option) => option.value === selectedEnergyType?.id
    );
  }, [energyTypesOptions, selectedEnergyType]);

  return (
    <PageShell
      title="New Energy Offering"
      isLoading={isLoading}
      isError={isError}
    >
      <p className="text-input-label pb-1">
        Select the Energy type you would like to create an offer
      </p>
      <Select
        className="max-w-sm"
        title="Select energy type"
        options={energyTypesOptions}
        selectedOption={selectedEnergyTypeOption}
        isLoading={isLoading}
        onSelect={handleEnergyTypeSelect}
      />

      {isLoadingEnergyForm && (
        <div className="py-4 flex items-center justify-center">
          <Spinner />
        </div>
      )}

      {!isLoadingEnergyForm && energyForm && (
        <DynamicForm formSchema={energyForm.formSchema} />
      )}
    </PageShell>
  );
};
