import { useCallback, useMemo, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { FunnelIcon } from "@heroicons/react/20/solid";
import { IEnergy } from "../../../domains/common/energy";
import { Checkbox } from "../../../components/lib/Checkbox";
import { Button } from "../../../components/lib/Button";

export const EnergyTypesFilter = ({ options, onSelect }: Props) => {
  const [selectedOptions, setSelectedOptions] = useState<IEnergy[]>([]);

  const handleClearAll = useCallback(() => {
    setSelectedOptions([]);
    onSelect([]);
  }, [onSelect]);

  const handleOnSelect = (selectedOption: IEnergy, checked: boolean) => {
    const updatedSelectedOptions = checked
      ? [...selectedOptions, selectedOption]
      : selectedOptions.filter((option) => option.id !== selectedOption.id);

    setSelectedOptions(updatedSelectedOptions);
    onSelect(updatedSelectedOptions);
  };

  const filtersAppliedCountText = useMemo(() => {
    const count = selectedOptions.length;

    if (!count) return "Filters";

    if (count > 1) return `${count} Filters`;

    return "1 Filter";
  }, [selectedOptions.length]);

  return (
    <Disclosure
      as="section"
      aria-labelledby="filter-heading"
      className="border-b border-t border-gray-200"
    >
      <div className="relative col-start-1 row-start-1 py-4">
        <div className="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Disclosure.Button className="group flex items-center font-medium text-gray-700">
              <FunnelIcon
                className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
              {filtersAppliedCountText}
            </Disclosure.Button>
          </div>
          <div className="pl-6">
            <Button
              variant="link"
              className="text-gray-500"
              onClick={handleClearAll}
            >
              Clear all
            </Button>
          </div>
        </div>
      </div>
      <Disclosure.Panel className="border-t border-gray-200 py-5">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
          <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
            <fieldset>
              <legend className="block font-medium">Energy types</legend>
              <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                {options.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center text-base sm:text-sm"
                  >
                    <Checkbox
                      label={option.name}
                      value={option.id}
                      checked={selectedOptions.some(
                        (selected) => selected.id === option.id
                      )}
                      onChange={(event) =>
                        handleOnSelect(option, event.target.checked)
                      }
                    />
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
};

type Props = {
  options: IEnergy[];
  onSelect: (options: IEnergy[]) => void;
};
