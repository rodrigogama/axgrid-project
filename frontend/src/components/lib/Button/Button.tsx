import clsx from "clsx";

export const Button = ({ className, variant, disabled, ...props }: Props) => {
  return (
    <button
      className={clsx("btn", className, {
        btn__primary: variant === "primary",
        btn__secondary: variant === "secondary",
        btn__link: variant === "link",
        btn__disabled: disabled,
      })}
      disabled={disabled}
      {...props}
    />
  );
};

type Props = {
  variant: "primary" | "secondary" | "link";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
