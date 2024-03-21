import { render } from "@testing-library/react";
import { Button } from "./Button";

describe("[components]: Button", () => {
  it("should render with the primary variant class", () => {
    const { getByRole } = render(<Button variant="primary" />);
    const button = getByRole("button");

    expect(button).toHaveClass("btn");
    expect(button).toHaveClass("btn__primary");
    expect(button).not.toHaveClass("btn__secondary");
    expect(button).not.toHaveClass("btn__link");
  });

  it("should render with the secondary variant class", () => {
    const { getByRole } = render(<Button variant="secondary" />);
    const button = getByRole("button");

    expect(button).toHaveClass("btn");
    expect(button).toHaveClass("btn__secondary");
    expect(button).not.toHaveClass("btn__primary");
    expect(button).not.toHaveClass("btn__link");
  });

  it("should render with the link variant class", () => {
    const { getByRole } = render(<Button variant="link" />);
    const button = getByRole("button");

    expect(button).toHaveClass("btn");
    expect(button).toHaveClass("btn__link");
    expect(button).not.toHaveClass("btn__primary");
    expect(button).not.toHaveClass("btn__secondary");
  });

  it("should accept additional className props", () => {
    const customClass = "custom-class";
    const { getByRole } = render(
      <Button variant="primary" className={customClass} />
    );
    const button = getByRole("button");

    expect(button).toHaveClass("btn");
    expect(button).toHaveClass(customClass);
  });
});
