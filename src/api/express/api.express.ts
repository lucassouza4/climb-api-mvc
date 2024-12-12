import { Api } from "../api";
import express, { Express, Request, Response } from "express";
import cors from "cors";

export class ApiExpress implements Api {
  private constructor(readonly app: Express) {}

  public static build() {
    const app = express();
    app.use(express.json());
    const corsOptions = {
      origin: process.env.CORS_ORIGIN,
      optionsSuccessStatus: 200,
    };
    app.use(cors(corsOptions));
    return new ApiExpress(app);
  }

  public addGetRoute(
    path: string,
    handle: (req: Request, res: Response) => Promise<void>,
  ): void {
    this.app.get(path, handle);
  }

  public addPostRoute(
    path: string,
    handle: (req: Request, res: Response) => Promise<void>,
  ): void {
    this.app.post(path, handle);
  }

  public addPutRoute(
    path: string,
    handle: (req: Request, res: Response) => Promise<void>,
  ): void {
    this.app.put(path, handle);
  }

  public addDeleteRoute(
    path: string,
    handle: (req: Request, res: Response) => Promise<void>,
  ): void {
    this.app.delete(path, handle);
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Rodando na porta: ${port}`);
    });

    this.printRoutes();
  }

  private printRoutes() {
    console.log("Rotas registradas:");
    this.app._router.stack.forEach((layer: any) => {
      if (layer.route) {
        const methods = Object.keys(layer.route.methods)
          .join(", ")
          .toUpperCase();
        console.log(`${methods} ${layer.route.path}`);
      }
    });
  }
}
