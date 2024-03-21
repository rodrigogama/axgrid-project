import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../test-utils";
import { FormField } from "../../../domains/common/formFields";
import { TextFieldRenderer } from "./TextFieldRenderer";
import { NumericFieldRenderer } from "./NumericFieldRenderer";
import { TextAreaFieldRenderer } from "./TextAreaFieldRenderer";
import { SelectFieldRenderer } from "./SelectFieldRenderer";

describe("[components]: DynamicForm > FieldRenderers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const defaultFieldProps = {
    name: "testInput",
    label: "Test Input",
    placeholder: "Enter your text",
  };

  describe("TextFieldRenderer", () => {
    const fieldProps: FormField = {
      ...defaultFieldProps,
      type: "text",
    };

    it("should render TextFieldRenderer correctly within react-hook-form FormProvider", () => {
      renderWithProviders(<TextFieldRenderer field={fieldProps} />);
      const input = screen.getByPlaceholderText(
        fieldProps.placeholder as string
      );

      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", fieldProps.type);
      expect(screen.getByLabelText(fieldProps.label)).toBeInTheDocument();
    });
  });

  describe("NumericFieldRenderer", () => {
    const fieldProps: FormField = {
      ...defaultFieldProps,
      type: "number",
    };

    it("should render NumericFieldRenderer correctly within react-hook-form FormProvider", () => {
      renderWithProviders(<NumericFieldRenderer field={fieldProps} />);
      const input = screen.getByPlaceholderText(
        fieldProps.placeholder as string
      );

      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", fieldProps.type);
      expect(screen.getByLabelText(fieldProps.label)).toBeInTheDocument();
    });
  });

  describe("TextAreaFieldRenderer", () => {
    const fieldProps: FormField = {
      ...defaultFieldProps,
      type: "textarea",
    };

    it("should render TextAreaFieldRenderer correctly within react-hook-form FormProvider", () => {
      renderWithProviders(<TextAreaFieldRenderer field={fieldProps} />);
      const input = screen.getByPlaceholderText(
        fieldProps.placeholder as string
      );

      expect(input).toBeInTheDocument();
      expect(input.tagName.toLocaleLowerCase()).toBe(fieldProps.type);
      expect(screen.getByLabelText(fieldProps.label)).toBeInTheDocument();
    });
  });

  describe("SelectFieldRenderer", () => {
    const fieldProps: FormField = {
      ...defaultFieldProps,
      type: "select",
      options: [
        { value: "1", label: "option 1" },
        { value: "2", label: "option 2" },
      ],
    };

    it("should render SelectFieldRenderer correctly within react-hook-form FormProvider", async () => {
      renderWithProviders(<SelectFieldRenderer field={fieldProps} />);

      const select = screen.getByText(fieldProps.label);
      expect(screen.getByText(fieldProps.label)).toBeInTheDocument();

      userEvent.click(select);
      expect(await screen.findAllByRole("menuitem")).toHaveLength(
        fieldProps.options.length
      );
    });
  });
});
