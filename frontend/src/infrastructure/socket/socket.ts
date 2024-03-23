import socketInstance from "./config";

class SocketClient {
  subscribe<T>(eventName: string, callback: (data: T) => void): void {
    socketInstance.on(eventName, callback);
  }

  unsubscribe(eventName: string): void {
    socketInstance.off(eventName);
  }
}

export const socketClient = new SocketClient();
