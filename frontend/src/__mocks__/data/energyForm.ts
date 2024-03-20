import { EnergyFormResponse } from "../../services/api/energy-form";

export const EnergyFormResponseMock: EnergyFormResponse = {
  id: "1",
  name: "Solar",
  formSchema: {
    title: "Solar Energy Offering Form",
    description: "Enter the details of the solar energy offering.",
    fields: [
      {
        name: "price",
        label: "Price per unit of energy",
        type: "number",
        placeholder: "e.g., 100",
        unit: "kWh/MWh",
      },
      {
        name: "minimumPurchaseQuantity",
        label: "Minimum Purchase Quantity",
        type: "number",
        placeholder: "e.g., 10",
      },
      {
        name: "contractTerms",
        label: "Contract Terms",
        type: "text",
        placeholder: "e.g., 1 year, penalties for early termination",
      },
      {
        name: "paymentTerms",
        label: "Payment Terms",
        type: "text",
        placeholder: "e.g., Monthly, post-delivery",
      },
      {
        name: "capacity",
        label: "Capacity",
        type: "number",
        placeholder: "e.g., 500",
        unit: "kW/MW",
      },
      {
        name: "location",
        label: "Location",
        type: "text",
        placeholder: "e.g., California, USA",
      },
      {
        name: "energyOutputPredictions",
        label: "Energy Output Predictions",
        type: "text",
        placeholder: "Based on historical data and weather forecasts",
      },
      {
        name: "timeOfAvailability",
        label: "Time of Availability",
        type: "text",
        placeholder: "e.g., Daylight hours",
      },
      {
        name: "certifications",
        label: "Certifications",
        type: "select",
        options: [
          {
            label: "Renewable Energy Certificates (RECs)",
            value: "REC",
          },
          {
            label: "Green",
            value: "Green",
          },
          {
            label: "Eco",
            value: "Eco",
          },
        ],
        placeholder: "Select certifications",
      },
    ],
  },
};
