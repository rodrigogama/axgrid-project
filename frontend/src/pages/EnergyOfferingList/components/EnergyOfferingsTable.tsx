import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { socketClient } from "../../../infrastructure/socket";
import { EnergyOfferingResponse } from "../../../services/api/energy-offerings";
import { useSelectedEnergyOffering } from "../../../shared/hooks/useSelectedEnergyOffering";
import { REAL_TIME_EVENT_NAMES } from "../../../shared/constants";
import { Badge, BadgeProps } from "../../../components/lib/Badge";
import { Button } from "../../../components/lib/Button";

const statusesVariants: { [k: string]: BadgeProps["variant"] } = {
  OPEN: "info",
  PROCESSING: "warn",
  ACCEPTED: "success",
};

export const EnergyOfferingsTable = ({ data, onShowDetailsClick }: Props) => {
  const [flashRowId, setFlashRowId] = useState<number | null>(null);
  const { onSelectEnergyOffering } =
    useSelectedEnergyOffering<EnergyOfferingRowData>();

  const handleDetails = useCallback(
    (energyOffering: EnergyOfferingRowData) => {
      onSelectEnergyOffering(energyOffering);
      onShowDetailsClick();
    },
    [onSelectEnergyOffering, onShowDetailsClick]
  );

  useEffect(() => {
    const handleRowUpdate = (updatedOffering: (typeof data)[number]) => {
      onSelectEnergyOffering(updatedOffering);
      setFlashRowId(updatedOffering.id);
    };

    socketClient.subscribe(
      REAL_TIME_EVENT_NAMES.STATUS_PROCESSING,
      handleRowUpdate
    );
    socketClient.subscribe(
      REAL_TIME_EVENT_NAMES.STATUS_ACCEPTED,
      handleRowUpdate
    );
  }, [onSelectEnergyOffering]);

  useEffect(() => {
    if (flashRowId !== null) {
      const timer = setTimeout(() => setFlashRowId(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [flashRowId]);

  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th
            scope="col"
            className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Energy Type
          </th>
          <th
            scope="col"
            className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Price (kWh, MWh)
          </th>
          <th
            scope="col"
            className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Min. Purchase Quantity
          </th>
          <th
            scope="col"
            className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Contract Terms
          </th>
          <th
            scope="col"
            className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Payment Terms
          </th>
          <th
            scope="col"
            className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Status
          </th>
          <th
            scope="col"
            className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-0"
          />
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {data.map((energyOffering) => (
          <tr key={energyOffering.id} data-testid={`row_${energyOffering.id}`}>
            <td className="px-2 py-2 text-sm font-medium text-gray-900">
              {energyOffering.name}
            </td>
            <td className="px-2 py-2 text-sm text-gray-500">
              {energyOffering.fields.price}
            </td>
            <td className="px-2 py-2 text-sm text-gray-500">
              <span className="max-w-40 inline-block">
                {energyOffering.fields.minimumPurchaseQuantity}
              </span>
            </td>
            <td className="px-2 py-2 text-sm text-gray-500">
              <span className="max-w-40 inline-block">
                {energyOffering.fields.contractTerms}
              </span>
            </td>
            <td className="px-2 py-2 text-sm text-gray-500">
              {energyOffering.fields.paymentTerms}
            </td>
            <td className="px-2 py-2">
              <Badge
                variant={statusesVariants[energyOffering.status]}
                className={clsx({
                  "animate-bounce": flashRowId === energyOffering.id,
                })}
              >
                {energyOffering.status}
              </Badge>
            </td>
            <td className="relative py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
              <Button
                variant="link"
                onClick={() => handleDetails(energyOffering)}
              >
                Show details
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export type EnergyOfferingRowData = EnergyOfferingResponse & { name: string };

type Props = {
  data: EnergyOfferingRowData[];
  onShowDetailsClick: () => void;
};
