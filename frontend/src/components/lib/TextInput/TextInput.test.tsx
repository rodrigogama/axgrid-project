import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextInput } from "./TextInput";

describe("[components]: TextInput", () => {
  it("should render correctly with a label", () => {
    render(<TextInput label="Username" name="username" />);

    expect(screen.getByLabelText("Username")).toBeInTheDocument();
  });

  it("should display error message when error prop is passed", () => {
    const errorMessage = "Error message";
    render(
      <TextInput label="Username" name="username" error={{ errorMessage }} />
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("should apply error styling when error is present", () => {
    const errorMessage = "Error message";
    render(
      <TextInput label="Username" name="username" error={{ errorMessage }} />
    );

    expect(screen.getByRole("textbox")).toHaveClass("text-input__error");
  });

  it("should forward the ref to the input element", async () => {
    const ref = vi.fn();
    render(<TextInput label="Username" name="username" ref={ref} />);

    await userEvent.type(screen.getByLabelText("Username"), "test");
    expect(ref).toHaveBeenCalled();
  });
});
