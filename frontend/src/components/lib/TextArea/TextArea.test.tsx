import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextArea } from "./TextArea";

describe("[components]: TextArea", () => {
  it("should render correctly with a label", () => {
    render(<TextArea label="Details" name="details" />);

    expect(screen.getByLabelText("Details")).toBeInTheDocument();
  });

  it("should display error message when error prop is passed", () => {
    const errorMessage = "Error message";
    render(
      <TextArea label="Details" name="details" error={{ errorMessage }} />
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("should apply error styling when error is present", () => {
    const errorMessage = "Error message";
    render(
      <TextArea label="Details" name="details" error={{ errorMessage }} />
    );

    expect(screen.getByRole("textbox")).toHaveClass(
      "text-area text-area__error"
    );
  });

  it("should forward the ref to the input element", async () => {
    const ref = vi.fn();
    render(<TextArea label="Details" name="details" ref={ref} />);

    await userEvent.type(screen.getByLabelText("Details"), "test");
    expect(ref).toHaveBeenCalled();
  });
});
