import { renderQueryHook } from "../../../test-utils";
import { socketClient } from "../../../infrastructure/socket";
import { useEnergyOfferings } from "./useEnergyOfferings";
import { REAL_TIME_EVENT_NAMES } from "../../constants";

vi.mock("../../../infrastructure/socket");

describe("[hooks]: useEnergyOfferings", () => {
  beforeEach(() => {
    vi.mocked(socketClient, true);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should subscribe and unsubscribe to energy offerings socket events", async () => {
    const expectedSocketEvents = [
      REAL_TIME_EVENT_NAMES.NEW_OFFERING,
      REAL_TIME_EVENT_NAMES.STATUS_PROCESSING,
      REAL_TIME_EVENT_NAMES.STATUS_ACCEPTED,
    ];

    const { unmount } = renderQueryHook(() => useEnergyOfferings());

    expect(socketClient.subscribe).toHaveBeenCalledTimes(
      expectedSocketEvents.length
    );

    for (const [eventIndex, eventName] of expectedSocketEvents.entries()) {
      expect(socketClient.subscribe).toHaveBeenNthCalledWith(
        eventIndex + 1,
        eventName,
        expect.any(Function)
      );
    }

    // check if unsubscribed on unmount
    unmount();

    expect(socketClient.unsubscribe).toHaveBeenCalledTimes(
      expectedSocketEvents.length
    );

    for (const [eventIndex, eventName] of expectedSocketEvents.entries()) {
      expect(socketClient.unsubscribe).toHaveBeenNthCalledWith(
        eventIndex + 1,
        eventName
      );
    }
  });
});
