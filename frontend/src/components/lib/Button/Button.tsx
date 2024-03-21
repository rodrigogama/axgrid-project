import clsx from "clsx";

export const Button = ({ className, variant, ...props }: Props) => {
  return (
    <button
      className={clsx("btn", className, {
        btn__primary: variant === "primary",
        btn__secondary: variant === "secondary",
        btn__link: variant === "link",
      })}
      {...props}
    />
  );
};

type Props = {
  variant: "primary" | "secondary" | "link";
} & React.HTMLAttributes<HTMLButtonElement>;
