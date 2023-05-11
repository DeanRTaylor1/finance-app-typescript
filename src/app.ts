import express, { Express, Request, Response, Router } from "express";
import morgan from "morgan";
import { formatMethod, formatStatus } from "./lib/util/log-format";
import { colors } from "./lib/util/colors";
import { v1Routes } from "./lib/routes/v1Routes";

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

    //Must be last
    this.setupNotFoundHandler();
  }

  public getExpressApp(): Express {
    return this.app;
  }

  private setupApiRoutes() {
    const apiRouter = Router();

    apiRouter.use("/v1", new v1Routes().getRouter());
    apiRouter.use("/v2", this.v2Routes());

    return apiRouter;
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

  public setupNotFoundHandler() {
    this.app.all("*", (req: Request, res: Response) => {
      res.status(404).send("404 Page not found");
    });
  }

  public start(port: string) {
    this.app.listen(port, () => {
      console.log(
        colors.BgCyan + "Server is running on port " + port + colors.Reset
      );
    });
  }
}
