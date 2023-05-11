import { Request, Response } from "express";

export class UsersController {
  public async signup(req: Request, res: Response): Promise<void> {
    console.log("signing up user");
    res.status(201).send("User signed up");
  }
}
