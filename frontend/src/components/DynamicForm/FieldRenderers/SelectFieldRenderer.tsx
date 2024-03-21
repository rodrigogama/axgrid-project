import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ISelectField } from "../../../domains/common/formFields";
import { Select, SelectOption } from "../../lib/Select";
import { FieldComponentProps } from "./types";

export const SelectFieldRenderer = ({ field }: FieldComponentProps) => {
  const [selectedOption, setSelectedOption] = useState<
    SelectOption | undefined
  >();

  const { register, setValue, watch } = useFormContext();
  const selectField = field as ISelectField;
  const selectFieldValue = watch(selectField.name);

  useEffect(() => {
    register(selectField.name, { shouldUnregister: true });
  }, [register, selectField]);

  useEffect(() => {
    // manually reset the local select state whenever the selectFieldValue is not defined
    if (!selectFieldValue) {
      setSelectedOption(undefined);
    }
  }, [selectFieldValue]);

  const handleSelectOption = useCallback(
    (option?: SelectOption) => {
      setValue(selectField.name, option?.value, {
        shouldDirty: true,
        shouldValidate: true,
        shouldTouch: true,
      });

      setSelectedOption(option);
    },
    [setValue, selectField]
  );

  return (
    <Select
      title={selectField.label}
      selectedOption={selectedOption}
      options={selectField.options}
      onSelect={handleSelectOption}
    />
  );
};
