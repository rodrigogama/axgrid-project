import { socketClient } from "./socket";
import socketInstance from "./config";

vi.mock("./config");

describe("[Infrastructure]: Socket", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should be able to subscribe to an event and unsubscribe from it", async () => {
    const callbackMock = vi.fn();
    vi.mocked(socketInstance, true);

    socketClient.subscribe("testEvent", callbackMock);

    expect(socketInstance.on).toHaveBeenCalledWith("testEvent", callbackMock);

    socketClient.unsubscribe("testEvent");
    expect(socketInstance.off).toHaveBeenCalledWith("testEvent");
  });
});
