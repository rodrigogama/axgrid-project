import { useFormContext } from "react-hook-form";
import { TextInput } from "../../lib/TextInput";
import { FieldComponentProps } from "./types";

export const TextFieldRenderer = ({ field }: FieldComponentProps) => {
  const { register } = useFormContext();

  return (
    <TextInput
      label={field.label}
      placeholder={field.placeholder}
      {...register(field.name)}
    />
  );
};
