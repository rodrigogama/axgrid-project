import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { EnergyTypeProvider } from "./shared/contexts/EnergyTypeContext";
import { EnergyOfferingProvider } from "./shared/contexts/EnergyOfferingContext";
import { AppRoutes } from "./routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchInterval: 10 * 60 * 1000, // 10 min
      staleTime: 10 * 60 * 1000, // 10 min
    },
  },
});

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <EnergyTypeProvider>
        <EnergyOfferingProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </EnergyOfferingProvider>
      </EnergyTypeProvider>
    </QueryClientProvider>
  );
};
