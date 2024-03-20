import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "./Checkbox";

describe("[components]: Checkbox", () => {
  it("should render with label and reflects checked state", () => {
    render(
      <Checkbox label="Test Checkbox" value="test" checked onChange={vi.fn()} />
    );

    const checkbox = screen.getByRole("checkbox", { name: "Test Checkbox" });
    expect(checkbox).toBeChecked();
  });

  it("should call onChange handler when clicked", async () => {
    const handleChange = vi.fn();
    render(
      <Checkbox
        label="Test Checkbox"
        value="test"
        checked={false}
        onChange={handleChange}
      />
    );

    const checkbox = screen.getByRole("checkbox", { name: "Test Checkbox" });
    await userEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalled();
  });

  it("should render as unchecked when checked is false", () => {
    render(
      <Checkbox
        label="Test Checkbox"
        value="test"
        checked={false}
        onChange={vi.fn()}
      />
    );

    const checkbox = screen.getByRole("checkbox", { name: "Test Checkbox" });
    expect(checkbox).not.toBeChecked();
  });
});
