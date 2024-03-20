import { Routes, Route, Navigate } from "react-router-dom";
import { protectedRoutes } from "./routes";

const defaultRoute = protectedRoutes.find((route) => route.default)!;

export const AppRoutes = () => {
  return (
    <Routes>
      {protectedRoutes.map(({ path, pageElement: PageElement }) => (
        <Route key={path} path={path} element={<PageElement />} />
      ))}

      <Route index element={<Navigate to={defaultRoute.path} replace />} />
    </Routes>
  );
};
