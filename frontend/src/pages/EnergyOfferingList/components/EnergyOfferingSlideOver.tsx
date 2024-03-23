import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useSelectedEnergyOffering } from "../../../shared/hooks/useSelectedEnergyOffering";
import { Badge, BadgeProps } from "../../../components/lib/Badge";
import { EnergyOfferingRowData } from "./EnergyOfferingsTable";
import { useGetEnergyForm } from "../../../shared/hooks/useGetEnergyForm";
import { Spinner } from "../../../components/lib/Spinner";
import { Button } from "../../../components/lib/Button";

const statusesVariants: { [k: string]: BadgeProps["variant"] } = {
  OPEN: "info",
  PROCESSING: "warn",
  ACCEPTED: "success",
};

export const EnergyOfferingSlideOver = ({ isOpen, onClose }: Props) => {
  const { selectedEnergyOffering, onSelectEnergyOffering } =
    useSelectedEnergyOffering<EnergyOfferingRowData>();

  const { data, isLoading } = useGetEnergyForm(
    selectedEnergyOffering?.energyTypeId
  );

  const formFields = data?.formSchema.fields ?? [];

  const formValues: { [key: string]: any } =
    selectedEnergyOffering?.fields ?? {};

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
                afterLeave={() => onSelectEnergyOffering()}
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-xl">
                  <div className="flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl">
                    <div className="px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-semibold leading-6 text-gray-900">
                          Energy Offering: {selectedEnergyOffering?.name}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={onClose}
                          >
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-3 flex-1 px-6 flex flex-col justify-between">
                      {isLoading && (
                        <div className="cursor-wait overflow-hidden">
                          <Spinner className="h-10 w-10 m-auto" />
                        </div>
                      )}

                      {!isLoading && (
                        <>
                          <dl className="space-y-0 divide-y divide-gray-200">
                            <div className="flex py-5">
                              <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                Status
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                                <Badge
                                  variant={
                                    statusesVariants[
                                      selectedEnergyOffering?.status as string
                                    ]
                                  }
                                >
                                  {selectedEnergyOffering?.status}
                                </Badge>
                              </dd>
                            </div>

                            {formFields.map((formField) => (
                              <div className="flex py-5" key={formField.name}>
                                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                  {formField.label}
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                                  <p>{formValues[formField.name]}</p>
                                </dd>
                              </div>
                            ))}
                          </dl>
                          <div className="pt-3 flex items-center justify-end gap-x-4">
                            <Button
                              variant="secondary"
                              className="max-w-max"
                              onClick={onClose}
                            >
                              Close
                            </Button>
                            <Button
                              variant="primary"
                              className="max-w-max"
                              disabled={
                                selectedEnergyOffering?.status !== "OPEN"
                              }
                            >
                              Buy Energy Offering
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
