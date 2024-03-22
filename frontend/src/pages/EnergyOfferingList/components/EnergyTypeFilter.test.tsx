import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EnergyTypesFilter } from "./EnergyTypeFilter";

describe("EnergyTypesFilter", () => {
  const mockOptions = [
    { id: "1", name: "Solar" },
    { id: "2", name: "Wind" },
  ];

  const mockOnSelect = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should call onSelect with correct parameters when an option is selected", async () => {
    render(<EnergyTypesFilter options={mockOptions} onSelect={mockOnSelect} />);

    const toggleFiltersButton = screen.getByText("Filters");
    await userEvent.click(toggleFiltersButton);

    const checkbox = screen.getByLabelText(mockOptions[0].name);
    await userEvent.click(checkbox);

    expect(mockOnSelect).toHaveBeenCalledWith([mockOptions[0]]);
  });

  it("should clear all selections when the clear button is clicked", async () => {
    render(<EnergyTypesFilter options={mockOptions} onSelect={mockOnSelect} />);

    const toggleFiltersButton = screen.getByText("Filters");
    await userEvent.click(toggleFiltersButton);

    const checkbox = screen.getByLabelText(mockOptions[0].name);
    await userEvent.click(checkbox);
    expect(mockOnSelect).toHaveBeenCalledWith([mockOptions[0]]);

    const clearButton = screen.getByText("Clear all");
    await userEvent.click(clearButton);

    expect(mockOnSelect).toHaveBeenCalledWith([]);
    expect(screen.getByText("Filters")).toBeInTheDocument();
  });

  it("should updated filters count correctly", async () => {
    render(<EnergyTypesFilter options={mockOptions} onSelect={mockOnSelect} />);

    const toggleFiltersButton = screen.getByText("Filters");
    await userEvent.click(toggleFiltersButton);

    let checkbox = screen.getByLabelText(mockOptions[0].name);
    await userEvent.click(checkbox);
    expect(screen.getByText("1 Filter")).toBeInTheDocument();

    checkbox = screen.getByLabelText(mockOptions[1].name);
    await userEvent.click(checkbox);
    expect(screen.getByText("2 Filters")).toBeInTheDocument();

    checkbox = screen.getByLabelText(mockOptions[1].name);
    await userEvent.click(checkbox);
    expect(screen.getByText("1 Filter")).toBeInTheDocument();
  });
});
