import { Router } from "express";
import { UsersController } from "../controllers/users-controller";

export class v1Routes {
  private router: Router;
  private usersController: UsersController;

  constructor() {
    this.router = Router();
    this.usersController = new UsersController();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.post("/users/signup", this.usersController.signup);
  }

  public getRouter(): Router {
    return this.router;
  }
}
