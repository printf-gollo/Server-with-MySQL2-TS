import express from "express";
import routes from "./routes/index";

class Server {
  public app: any;
  private port: any;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(express.json());
  }

  private routes() {
    this.app.use(routes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

export default Server;
