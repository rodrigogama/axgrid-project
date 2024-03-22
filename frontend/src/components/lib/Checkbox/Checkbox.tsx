import clsx from "clsx";

export const Checkbox = ({ label, value, className, ...props }: Props) => {
  return (
    <div className="flex items-center">
      <input
        id={`checkbox-${value}`}
        name={value}
        defaultValue={value}
        type="checkbox"
        className={clsx(
          "h-4 w-4 rounded border-gray-300 text-indigo-500 focus:ring-indigotext-indigo-500 cursor-pointer",
          className
        )}
        {...props}
      />
      <label
        htmlFor={`checkbox-${value}`}
        className="pl-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900 cursor-pointer w-full"
      >
        {label}
      </label>
    </div>
  );
};

type Props = {
  label: string;
  value: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
