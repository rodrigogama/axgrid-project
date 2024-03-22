import { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { EnergyFormFields, FormSchema } from "../../domains/common/formFields";
import { useCreateEnergyOffering } from "../../shared/hooks/useCreateEnergyOffering";
import { useSelectedEnergyType } from "../../shared/hooks/useSelectedEnergyType";
import { Button } from "../lib/Button";
import { FieldRenderers } from "./FieldRenderers";

export const DynamicForm = ({ formSchema }: Props) => {
  const { title, description, fields } = formSchema;

  const methods = useForm();
  const { onCreate } = useCreateEnergyOffering();
  const { selectedEnergyType } = useSelectedEnergyType();

  const handleClearForm = useCallback(() => {
    const { reset } = methods;

    // resetting only the form values, although we could reset form errors, if any.
    // not using any validation method for this challenge though
    reset();
  }, [methods]);

  const onSubmit = useCallback(
    (data: any) => {
      const submittedFields = data as EnergyFormFields;
      onCreate(
        {
          data: {
            energyTypeId: selectedEnergyType?.id as string,
            fields: submittedFields,
          },
        },
        {
          onSuccess: () => {
            alert(
              `${selectedEnergyType?.name} energy offering created succesfully!`
            );
          },
          onSettled: handleClearForm,
        }
      );
    },
    [onCreate, handleClearForm, selectedEnergyType]
  );

  return (
    <div className="flex gap-x-20 w-full justify-between">
      <div className="mt-10 flex-1 max-w-sm">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          {title}
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">{description}</p>
      </div>
      <FormProvider {...methods}>
        <form
          className="mt-10 flex flex-col gap-y-4 flex-1"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {fields.map((field) => {
            const FieldComponent = FieldRenderers[field.type];

            return FieldComponent ? (
              <div key={field.name} className="sm:col-span-4">
                <FieldComponent field={field} />
              </div>
            ) : null;
          })}

          <div className="pt-5 flex items-center justify-end gap-x-4">
            <Button
              variant="secondary"
              className="max-w-max"
              onClick={handleClearForm}
            >
              Clear form
            </Button>
            <Button variant="primary" className="max-w-max">
              Create offer
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

type Props = {
  formSchema: FormSchema;
};
