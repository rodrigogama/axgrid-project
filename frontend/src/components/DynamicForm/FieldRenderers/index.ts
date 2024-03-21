import { NumericFieldRenderer } from "./NumericFieldRenderer";
import { SelectFieldRenderer } from "./SelectFieldRenderer";
import { TextAreaFieldRenderer } from "./TextAreaFieldRenderer";
import { TextFieldRenderer } from "./TextFieldRenderer";

export const FieldRenderers = {
  text: TextFieldRenderer,
  textarea: TextAreaFieldRenderer,
  number: NumericFieldRenderer,
  select: SelectFieldRenderer,
};
