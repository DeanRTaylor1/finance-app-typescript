import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

//Must keep the next function in there so that express recognises this as an error handling middleware
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  res.status(400).send({ errors: [{ message: "Something went wrong" }] });
};
