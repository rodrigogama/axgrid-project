import clsx from "clsx";

export const Badge = ({ variant, className, ...props }: Props) => {
  return (
    <span
      role="status"
      className={clsx(
        "badge",
        {
          badge__info: variant === "info",
          badge__warn: variant === "warn",
          badge__danger: variant === "danger",
          badge__success: variant === "success",
        },
        className
      )}
      {...props}
    />
  );
};

export type Props = {
  variant: "info" | "danger" | "success" | "warn";
} & React.HTMLAttributes<HTMLSpanElement>;
