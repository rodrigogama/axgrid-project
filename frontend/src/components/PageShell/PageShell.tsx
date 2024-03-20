import { PropsWithChildren } from "react";
import { Spinner } from "../lib/Spinner";
import { Alert } from "../lib/Alert";
import { Navbar } from "../Navbar";

export const PageShell = ({
  title,
  children,
  isLoading,
  isError,
}: PropsWithChildren<Props>) => {
  return (
    <>
      <div className="min-h-full">
        <div className="bg-gray-800 pb-32">
          <div className="mx-auto max-w-7xl px-8">
            <Navbar />
          </div>

          <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                {title}
              </h1>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
              {isLoading && (
                <div role="status" className="flex items-center justify-center">
                  <Spinner />
                </div>
              )}

              {isError && (
                <Alert
                  className="max-w-md mx-auto"
                  variant="danger"
                  message="Something went wrong. Please, try again in a few moments."
                />
              )}

              {!isLoading && !isError && children}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

type Props = {
  title: string;
  isLoading?: boolean;
  isError?: boolean;
};
