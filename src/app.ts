import dotenv from "dotenv";
import Server from "./server";

dotenv.config();

const server: any = new Server();
server.listen();
