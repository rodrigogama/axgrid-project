import { screen } from "@testing-library/react";
import { renderWithRouterAndProviders } from "../../test-utils";
import { PageShell } from "./PageShell";

describe("[components]: PageShell", () => {
  it("should display the page title", () => {
    renderWithRouterAndProviders(<PageShell title="Title">Content</PageShell>);
    expect(screen.getByText("Title")).toBeInTheDocument();
  });

  it("should renders children when not loading", () => {
    renderWithRouterAndProviders(<PageShell title="Title">Content</PageShell>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("should render a Spinner when loading", () => {
    renderWithRouterAndProviders(
      <PageShell title="Title" isLoading>
        Content
      </PageShell>
    );

    expect(
      screen.getByRole("progressbar", { hidden: true })
    ).toBeInTheDocument();
    expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
  });

  it("should render an error message when error", () => {
    renderWithRouterAndProviders(
      <PageShell title="Title" isError>
        Content
      </PageShell>
    );

    expect(
      screen.getByText(
        "Something went wrong. Please, try again in a few moments."
      )
    ).toBeInTheDocument();
    expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
  });
});
