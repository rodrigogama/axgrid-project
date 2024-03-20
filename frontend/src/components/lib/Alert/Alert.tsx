import {
  XCircleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";

const variantIcons = {
  info: InformationCircleIcon,
  danger: XCircleIcon,
  success: CheckCircleIcon,
  warn: ExclamationTriangleIcon,
};

export const Alert = ({ message, variant, className }: Props) => {
  const Icon = variantIcons[variant];

  return (
    <div
      className={clsx("border-l-4 p-2 rounded-md", className, {
        alert__info: variant === "info",
        alert__danger: variant === "danger",
        alert__success: variant === "success",
        alert__warn: variant === "warn",
      })}
      role="alert"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon
            className={clsx("h-5 w-5", {
              "alert-icon__info": variant === "info",
              "alert-icon__danger": variant === "danger",
              "alert-icon__success": variant === "success",
              "alert-icon__warn": variant === "warn",
            })}
            role="img"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p
            className={clsx("text-sm", {
              "alert-text__info": variant === "info",
              "alert-text__danger": variant === "danger",
              "alert-text__success": variant === "success",
              "alert-text__warn": variant === "warn",
            })}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

type Props = {
  message: string;
  variant: "info" | "danger" | "success" | "warn";
} & React.HTMLAttributes<HTMLDivElement>;
