import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test-utils";
import { EnergyTypesResponseMock } from "../../__mocks__/data/energyTypes";
import { FormSchema } from "../../domains/common/formFields";
import * as useSelectedEnergyType from "../../shared/hooks/useSelectedEnergyType";
import { EnergyOfferingService } from "../../services/api/energy-offerings";
import { DynamicForm } from "./DynamicForm";

const formSchemaMock: FormSchema = {
  title: "Thermal Energy Offering Form",
  description: "Enter the details of the thermal energy offering.",
  fields: [
    {
      name: "paymentTerms",
      label: "Payment Terms",
      type: "text",
      placeholder: "e.g., Semi-annually, post-delivery",
    },
    {
      name: "contractTerms",
      label: "Contract Terms",
      type: "textarea",
      placeholder: "e.g., 10 years, penalties for early termination",
    },
  ],
};

const selectedEnergyTypeMock = EnergyTypesResponseMock[0];

const expectedInputValues: { [key: string]: string } = {
  paymentTerms: "Semi-annually, post-delivery",
  contractTerms: "10 years, penalties for early termination",
};

describe("[components]: DynamicForm", () => {
  const alertMock = vi.fn();

  const useSelectedEnergyTypeSpy = vi.spyOn(
    useSelectedEnergyType,
    "useSelectedEnergyType"
  );

  beforeEach(() => {
    window.alert = alertMock;

    useSelectedEnergyTypeSpy.mockReturnValue({
      selectedEnergyType: selectedEnergyTypeMock,
      onSelectEnergyType: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render a dynamic form with title, description and action buttons correctly", () => {
    renderWithProviders(<DynamicForm formSchema={formSchemaMock} />);

    expect(screen.getByText(formSchemaMock.title)).toBeInTheDocument();
    expect(screen.getByText(formSchemaMock.description)).toBeInTheDocument();
    expect(screen.getByText("Clear form")).toBeInTheDocument();
    expect(screen.getByText("Create offer")).toBeInTheDocument();
  });

  it("should render a dynamic form fields correctly", () => {
    renderWithProviders(<DynamicForm formSchema={formSchemaMock} />);

    for (const field of formSchemaMock.fields) {
      expect(screen.getByText(field.label)).toBeInTheDocument();
    }
  });

  it("should submit the form and clear it on success", async () => {
    const serviceSpy = vi.spyOn(EnergyOfferingService, "save");
    const expected = {
      energyTypeId: selectedEnergyTypeMock.id,
      fields: expectedInputValues,
    };

    renderWithProviders(<DynamicForm formSchema={formSchemaMock} />);

    for (const field of formSchemaMock.fields) {
      const input = screen.getByPlaceholderText(field.placeholder!);
      const inputValue = expectedInputValues[field.name];
      await userEvent.type(input, inputValue);
    }

    const submitButton = screen.getByText("Create offer");
    await userEvent.click(submitButton);

    expect(serviceSpy).toHaveBeenCalledWith(expected);
    expect(alertMock).toHaveBeenCalledWith(
      `${selectedEnergyTypeMock.name} energy offering created succesfully!`
    );

    for (const field of formSchemaMock.fields) {
      const input = screen.getByPlaceholderText(field.placeholder!);
      expect(input).toHaveValue("");
    }
  });

  it("should clear the form fields when clicking on Clear button", async () => {
    renderWithProviders(<DynamicForm formSchema={formSchemaMock} />);

    for (const field of formSchemaMock.fields) {
      const input = screen.getByPlaceholderText(field.placeholder!);
      const inputValue = expectedInputValues[field.name];
      await userEvent.type(input, inputValue);
    }

    const clearButton = screen.getByText("Clear form");
    await userEvent.click(clearButton);

    for (const field of formSchemaMock.fields) {
      const input = screen.getByPlaceholderText(field.placeholder!);
      expect(input).toHaveValue("");
    }
  });
});
