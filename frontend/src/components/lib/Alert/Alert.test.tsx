import { render, screen } from "@testing-library/react";
import { Alert } from "./Alert";

describe("[components]: Alert", () => {
  it("should render correctly with message and variant", () => {
    render(<Alert message="This is an info alert" variant="info" />);

    expect(screen.getByRole("alert")).toHaveClass("alert__info");
    expect(screen.getByText("This is an info alert")).toHaveClass(
      "alert-text__info"
    );
    expect(screen.getByRole("img", { hidden: true })).toHaveClass(
      "alert-icon__info"
    );
  });

  it("should apply correct classes for the danger variant", () => {
    render(<Alert message="Danger ahead!" variant="danger" />);

    expect(screen.getByRole("alert")).toHaveClass("alert__danger");
    expect(screen.getByText("Danger ahead!")).toHaveClass("alert-text__danger");
    expect(screen.getByRole("img", { hidden: true })).toHaveClass(
      "alert-icon__danger"
    );
  });

  it("applies correct classes for the success variant", () => {
    render(<Alert message="Operation successful" variant="success" />);

    expect(screen.getByRole("alert")).toHaveClass("alert__success");
    expect(screen.getByText("Operation successful")).toHaveClass(
      "alert-text__success"
    );
    expect(screen.getByRole("img", { hidden: true })).toHaveClass(
      "alert-icon__success"
    );
  });

  it("applies correct classes for the warn variant", () => {
    render(<Alert message="Warning: Proceed with caution" variant="warn" />);

    expect(screen.getByRole("alert")).toHaveClass("alert__warn");
    expect(screen.getByText("Warning: Proceed with caution")).toHaveClass(
      "alert-text__warn"
    );
    expect(screen.getByRole("img", { hidden: true })).toHaveClass(
      "alert-icon__warn"
    );
  });
});
