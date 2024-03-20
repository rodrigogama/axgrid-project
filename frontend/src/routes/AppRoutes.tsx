import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes } from "./routes";

export const AppRoutes = () => {
  return (
    <Routes>
      {publicRoutes.map(({ path, pageElement: PageElement }) => (
        <Route key={path} path={path} element={<PageElement />} />
      ))}

      <Route index element={<Navigate to="/energy-offerings" replace />} />
    </Routes>
  );
};
