import { useFormContext } from "react-hook-form";
import { TextArea } from "../../lib/TextArea";
import { FieldComponentProps } from "./types";

export const TextAreaFieldRenderer = ({ field }: FieldComponentProps) => {
  const { register } = useFormContext();

  return (
    <TextArea
      label={field.label}
      placeholder={field.placeholder}
      {...register(field.name)}
    />
  );
};
