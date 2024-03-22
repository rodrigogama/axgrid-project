import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";

describe("[components]: Badge", () => {
  const badgeMessage = "badge message";

  it("should render correctly with message and variant", () => {
    render(<Badge variant="info">{badgeMessage}</Badge>);

    expect(screen.getByRole("status")).toHaveClass("badge__info");
    expect(screen.getByText(badgeMessage)).toBeInTheDocument();
  });

  it("should apply correct classes for the danger variant", () => {
    render(<Badge variant="danger">{badgeMessage}</Badge>);

    expect(screen.getByRole("status")).toHaveClass("badge__danger");
    expect(screen.getByText(badgeMessage)).toBeInTheDocument();
  });

  it("should apply correct classes for the warn variant", () => {
    render(<Badge variant="warn">{badgeMessage}</Badge>);

    expect(screen.getByRole("status")).toHaveClass("badge__warn");
    expect(screen.getByText(badgeMessage)).toBeInTheDocument();
  });

  it("should apply correct classes for the success variant", () => {
    render(<Badge variant="success">{badgeMessage}</Badge>);

    expect(screen.getByRole("status")).toHaveClass("badge__success");
    expect(screen.getByText(badgeMessage)).toBeInTheDocument();
  });
});
