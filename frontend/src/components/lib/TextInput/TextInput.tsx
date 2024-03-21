import { InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

export const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ label, name, error, ...inputProps }, ref) => {
    return (
      <div>
        <label
          htmlFor={name}
          className={clsx("text-input-label", {
            "text-input-label__error": error,
          })}
        >
          {label}
        </label>
        <div className="mt-0.5">
          <input
            type="text"
            id={name}
            name={name}
            className={clsx("text-input", { "text-input__error": error })}
            ref={ref}
            {...inputProps}
          />
          {error?.errorMessage && (
            <p className="mt-1 text-sm text-red-600">{error?.errorMessage}</p>
          )}
        </div>
      </div>
    );
  }
);

type Props = {
  name: string;
  label: string;
  error?: { errorMessage: string | undefined };
} & InputHTMLAttributes<HTMLInputElement>;
