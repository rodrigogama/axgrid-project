import { InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, name, error, ...inputProps }, ref) => {
    return (
      <div className="relative">
        <label
          htmlFor={name}
          className={clsx("label-text-area", {
            "label-text-area__error": error,
          })}
        >
          {label}
        </label>
        <textarea
          id={name}
          name={name}
          rows={3}
          className={clsx("text-area", { "text-area__error": error })}
          ref={ref}
          {...inputProps}
        />
        {error?.errorMessage && (
          <p className="mt-1 text-sm text-red-600">{error?.errorMessage}</p>
        )}
      </div>
    );
  }
);

type Props = {
  name: string;
  label: string;
  error?: { errorMessage: string | undefined };
} & InputHTMLAttributes<HTMLTextAreaElement>;
