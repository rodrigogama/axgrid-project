import { Socket, io } from "socket.io-client";

const socketInstance: Socket = io(import.meta.env.VITE_SERVER_BASE_URL);

export default socketInstance;
