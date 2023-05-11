import express, { Express, Request, Response, Router } from "express";
import morgan from "morgan";
import { formatMethod, formatStatus } from "./lib/util/log-format";
import { colors } from "./lib/util/colors";

export class App {
  private app: Express;
  constructor() {
    this.app = express();
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === "dev") {
      console.log("setting up logging");
      this.setupDevLogging();
    }
    this.app.use("/api", this.setupApiRoutes());
  }

  public getExpressApp(): Express {
    return this.app;
  }

  private setupApiRoutes() {
    const apiRouter = Router();

    apiRouter.use("/v1", this.v1Routes());
    apiRouter.use("/v2", this.v2Routes());

    return apiRouter;
  }

  private v1Routes() {
    const router = Router();

    router.use("/users", (req: Request, res: Response) => {
      console.log("users");
      res.status(200).send("success");
    });

    return router;
  }

  private v2Routes() {
    const router = Router();

    router.use("/users", (req: Request, res: Response) => {
      console.log("v2 users");
      res.status(200).send("v2 success");
    });

    return router;
  }

  private setupDevLogging() {
    //set morgan logger format colors
    morgan.token("colored-status", (req: Request, res: Response) =>
      formatStatus(res.statusCode)
    );

    morgan.token("colored-method", (req: Request) => formatMethod(req.method));
    morgan.token("end", () => formatMethod());

    //set morgan logger
    this.app.use(
      morgan(
        `[Express] :date[iso] | :colored-status | :response-time ms | :remote-addr | :colored-method ":url" :end`,
        {
          stream: process.stdout,
        }
      )
    );
  }

  public start(port: string) {
    this.app.listen(port, () => {
      console.log(
        colors.BgCyan + "Server is running on port " + port + colors.Reset
      );
    });
  }
}
