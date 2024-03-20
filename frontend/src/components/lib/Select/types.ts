export type SelectOption = {
  label: string;
  value: string;
};

type SelectBaseProps = {
  title: string;
  options: SelectOption[];
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  error?: { errorMessage: string | undefined };
};

export type SelectProps = SelectBaseProps & {
  selectedOption?: SelectOption;
  onSelect: (option?: SelectOption) => void;
};

export type MultiSelectProps = SelectBaseProps & {
  selectedOptions: SelectOption[];
  onSelect: (options: SelectOption[]) => void;
};
