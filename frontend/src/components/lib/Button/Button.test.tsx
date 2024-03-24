import { screen, render } from "@testing-library/react";
import { Button } from "./Button";

describe("[components]: Button", () => {
  it("should render with the primary variant class", () => {
    render(<Button variant="primary" />);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("btn");
    expect(button).toHaveClass("btn__primary");
    expect(button).not.toHaveClass("btn__secondary");
    expect(button).not.toHaveClass("btn__link");
  });

  it("should render with the secondary variant class", () => {
    render(<Button variant="secondary" />);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("btn");
    expect(button).toHaveClass("btn__secondary");
    expect(button).not.toHaveClass("btn__primary");
    expect(button).not.toHaveClass("btn__link");
  });

  it("should render with the link variant class", () => {
    render(<Button variant="link" />);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("btn");
    expect(button).toHaveClass("btn__link");
    expect(button).not.toHaveClass("btn__primary");
    expect(button).not.toHaveClass("btn__secondary");
  });

  it("should accept additional className props", () => {
    const customClass = "custom-class";
    render(<Button variant="primary" className={customClass} />);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("btn");
    expect(button).toHaveClass(customClass);
  });

  it("should show a Spiiner when isLoading is set to true", () => {
    render(<Button variant="primary" isLoading />);
    const spinner = screen.getByRole("progressbar", { hidden: true });

    expect(spinner).toBeInTheDocument();
  });
});
