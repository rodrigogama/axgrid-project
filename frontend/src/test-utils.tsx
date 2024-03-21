import { ReactElement, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { render, RenderOptions } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { EnergyTypeProvider } from "./shared/contexts/EnergyTypeContext";

interface RenderQueryHookOptions {
  queryClient?: QueryClient;
}

const defaultTestQueryClientOptions = {
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: Infinity,
    },
  },
};

export function renderQueryHook<T>(
  hook: () => T,
  { queryClient }: RenderQueryHookOptions = {}
) {
  const client = queryClient || new QueryClient(defaultTestQueryClientOptions);

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>
      <EnergyTypeProvider>{children}</EnergyTypeProvider>
    </QueryClientProvider>
  );

  return renderHook(hook, { wrapper });
}

export const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries"> & RenderQueryHookOptions
) => {
  const client =
    options?.queryClient || new QueryClient(defaultTestQueryClientOptions);

  return {
    ...render(
      <QueryClientProvider client={client}>
        <EnergyTypeProvider>{ui}</EnergyTypeProvider>
      </QueryClientProvider>,
      options
    ),
  };
};

export const renderWithRouterAndProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries"> & RenderQueryHookOptions,
  path?: {
    path: string;
    url: string;
  }
) => {
  return {
    ...renderWithProviders(
      <BrowserRouter>
        <Routes>
          <Route path={path?.path || ""} element={ui} />
        </Routes>
      </BrowserRouter>,
      options
    ),
  };
};
