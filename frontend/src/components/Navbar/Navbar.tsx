import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { publicRoutes } from "../../routes";

export const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="flex h-16 items-center border-b border-gray-700 space-x-4">
      {publicRoutes.map((route) => (
        <Link
          key={route.id}
          to={route.path}
          className={clsx(
            "text-gray-300 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white",
            {
              "bg-gray-900 text-white": route.path === pathname,
            }
          )}
          aria-current={route.path === pathname ? "page" : undefined}
        >
          {route.displayName}
        </Link>
      ))}
    </nav>
  );
};
