import clsx from "clsx";
import { Spinner } from "../Spinner";

export const Button = ({
  children,
  className,
  variant,
  disabled,
  isLoading,
  ...props
}: Props) => {
  return (
    <button
      className={clsx("btn", className, {
        btn__primary: variant === "primary",
        btn__secondary: variant === "secondary",
        btn__link: variant === "link",
        btn__disabled: disabled,
      })}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Spinner className="h-5 w-5 mx-auto" />}

      {!isLoading && children}
    </button>
  );
};

type Props = {
  variant: "primary" | "secondary" | "link";
  isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
