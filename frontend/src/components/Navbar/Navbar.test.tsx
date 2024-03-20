import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { protectedRoutes } from "../../routes";
import { Navbar } from "./Navbar";

describe("[components]: Navbar", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  protectedRoutes.forEach((route) => {
    it(`should highlight the "${route.displayName}" item when on ${route.path}`, () => {
      const useLocationMock = vi.fn().mockReturnValue({ pathname: route.path });

      vi.doMock("react-router-dom", async () => {
        const originalModule = await vi.importActual("react-router-dom");
        return {
          ...originalModule,
          useLocation: useLocationMock,
        };
      });

      render(
        <MemoryRouter initialEntries={[route.path]}>
          <Routes>
            <Route path={route.path} element={<Navbar />} />
          </Routes>
        </MemoryRouter>
      );

      const activeItem = screen.getByText(route.displayName);

      expect(activeItem).toHaveClass("bg-gray-900 text-white");
      expect(
        screen.getByRole("link", { name: route.displayName })
      ).toHaveAttribute("href", route.path);
    });
  });
});
