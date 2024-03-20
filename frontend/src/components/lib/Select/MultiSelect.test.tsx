import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MultiSelect } from "./MultiSelect";
import { SelectOption } from "./types";

const options: SelectOption[] = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
];

describe("[components]: MultiSelect", () => {
  it("should render with title and display count of selected options", () => {
    render(
      <MultiSelect
        title="Options"
        options={options}
        selectedOptions={[options[0]]}
        onSelect={vi.fn()}
      />
    );

    expect(screen.getByText("Options")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("should open the options list and display options correctly", async () => {
    render(
      <MultiSelect
        title="Options"
        options={options}
        selectedOptions={[]}
        onSelect={vi.fn()}
      />
    );

    userEvent.click(screen.getByText("Options"));
    expect(await screen.findAllByRole("checkbox")).toHaveLength(options.length);
  });

  it("should not open the options list when disabled", async () => {
    render(
      <MultiSelect
        title="Options"
        options={options}
        selectedOptions={[]}
        disabled
        onSelect={vi.fn()}
      />
    );

    userEvent.click(screen.getByText("Options"));
    expect(screen.queryAllByRole("checkbox")).toHaveLength(0);
  });

  it("should show a loading Spinner when loading", async () => {
    render(
      <MultiSelect
        title="Options"
        options={options}
        selectedOptions={[]}
        onSelect={vi.fn()}
        isLoading
      />
    );

    userEvent.click(screen.getByText("Options"));

    await waitFor(() => {
      expect(
        screen.getByRole("progressbar", { hidden: true })
      ).toBeInTheDocument();
    });
    expect(screen.queryAllByRole("checkbox")).toHaveLength(0);
  });

  it("should onSelect with updated options when an option is clicked", async () => {
    const onSelectMock = vi.fn();
    render(
      <MultiSelect
        title="Options"
        options={options}
        selectedOptions={[]}
        onSelect={onSelectMock}
      />
    );

    userEvent.click(screen.getByText("Options"));

    const option1Checkbox = await screen.findByLabelText(options[0].label);
    await userEvent.click(option1Checkbox);

    expect(onSelectMock).toHaveBeenCalledWith([options[0]]);
  });

  it("should update selected options correctly when an option is deselected", async () => {
    const onSelectMock = vi.fn();
    render(
      <MultiSelect
        title="Options"
        options={options}
        selectedOptions={[options[0]]}
        onSelect={onSelectMock}
      />
    );

    userEvent.click(screen.getByText("Options"));

    const option1Checkbox = await screen.findByLabelText(options[0].label);
    await userEvent.click(option1Checkbox);

    expect(onSelectMock).toHaveBeenCalledWith([]);
  });
});
