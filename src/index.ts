import dotenv from "dotenv";
import { App } from "./app";

(() => {
  dotenv.config();

  const app = new App();

  app.start(process.env.PORT || "3000");
})();
