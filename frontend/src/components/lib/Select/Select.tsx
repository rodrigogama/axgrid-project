import { Fragment } from "react";
import clsx from "clsx";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { SelectOption, SelectProps } from "./types";
import { Spinner } from "../Spinner";

export const Select = ({
  disabled,
  title,
  options,
  isLoading,
  selectedOption,
  className,
  error,
  onSelect,
}: SelectProps) => {
  const handleSelect = (option: SelectOption) => {
    if (selectedOption?.value === option.value) {
      onSelect();
      return;
    }

    onSelect(option);
  };

  return (
    <Menu
      as="div"
      className={clsx("relative inline-block text-left min-w-max", className)}
    >
      <Menu.Button
        disabled={disabled}
        className={clsx(
          "group inline-flex min-w-28 w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
          {
            "cursor-not-allowed !bg-gray-50": disabled,
            "text-error-dark ring-error-light placeholder:text-error-light focus:ring-error-default focus-visible:ring-error-default":
              error,
          }
        )}
      >
        <span
          className={clsx({
            "text-gray-500": disabled,
          })}
        >
          {selectedOption?.label ?? title}
        </span>
        <ChevronDownIcon
          aria-hidden="true"
          className={clsx(
            "-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500",
            {
              "!text-gray-400": disabled,
            }
          )}
        />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 min-w-full z-10 mt-2 origin-top-right rounded-md max-h-72 overflow-y-auto bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer">
          <div className="py-1">
            {isLoading && (
              <Menu.Item disabled>
                <div className="cursor-wait overflow-hidden">
                  <Spinner className="h-6 w-6 m-auto" />
                </div>
              </Menu.Item>
            )}

            {!isLoading &&
              options.map((option) => (
                <Menu.Item key={option.value}>
                  {({ active }) => (
                    <span
                      className={clsx("block px-4 py-2 text-sm text-gray-500", {
                        "bg-gray-100": active,
                        "font-medium text-gray-900":
                          option.value === selectedOption?.value,
                      })}
                      onClick={() => handleSelect(option)}
                    >
                      {option.label}
                    </span>
                  )}
                </Menu.Item>
              ))}
          </div>
        </Menu.Items>
      </Transition>

      {error?.errorMessage && (
        <p className="mt-1 text-sm text-error-default">{error?.errorMessage}</p>
      )}
    </Menu>
  );
};
