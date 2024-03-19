import { QueryClient, QueryClientProvider } from "react-query";

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
      <div>App!</div>
    </QueryClientProvider>
  );
};
