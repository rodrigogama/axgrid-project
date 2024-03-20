import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select } from "./Select";
import { SelectOption } from "./types";

const options: SelectOption[] = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
];

describe("[components]: Select", () => {
  it("should render with title correctly", () => {
    render(<Select title="Options" options={options} onSelect={vi.fn()} />);

    expect(screen.getByText("Options")).toBeInTheDocument();
  });

  it("should replace title with selected option label when an option is selected", () => {
    render(
      <Select
        title="Options"
        options={options}
        selectedOption={options[0]}
        onSelect={vi.fn()}
      />
    );

    expect(screen.queryByText("Options")).not.toBeInTheDocument();
    expect(screen.getByText(options[0].label)).toBeInTheDocument();
  });

  it("should open the options list and display options correctly", async () => {
    render(<Select title="Options" options={options} onSelect={vi.fn()} />);

    userEvent.click(screen.getByText("Options"));
    expect(await screen.findAllByRole("menuitem")).toHaveLength(options.length);
  });

  it("should not open the options list when disabled", async () => {
    render(
      <Select title="Options" options={options} onSelect={vi.fn()} disabled />
    );

    userEvent.click(screen.getByText("Options"));
    expect(screen.queryAllByRole("menuitem")).toHaveLength(0);
  });

  it("should show a loading Spinner when loading", async () => {
    render(
      <Select title="Options" options={options} onSelect={vi.fn()} isLoading />
    );
    userEvent.click(screen.getByText("Options"));

    await waitFor(() => {
      expect(
        screen.getByRole("progressbar", { hidden: true })
      ).toBeInTheDocument();
    });
    expect(screen.queryAllByRole("menuitem")).toHaveLength(1);
  });

  it("should call onSelect with selected option when an option is clicked", async () => {
    const onSelectMock = vi.fn();
    render(
      <Select title="Options" options={options} onSelect={onSelectMock} />
    );

    userEvent.click(screen.getByText("Options"));

    const option1Checkbox = await screen.findByText(options[0].label);
    await userEvent.click(option1Checkbox);

    expect(onSelectMock).toHaveBeenCalledWith(options[0]);
  });

  it("should update selected option correctly when an option is deselected", async () => {
    const onSelectMock = vi.fn();
    render(
      <Select
        title="Options"
        options={options}
        selectedOption={options[0]}
        onSelect={onSelectMock}
      />
    );

    userEvent.click(screen.getByText(options[0].label));

    const option1Checkbox = await screen.findByRole("menuitem", {
      name: options[0].label,
    });
    await userEvent.click(option1Checkbox);

    expect(onSelectMock).toHaveBeenCalledWith();
  });
});
