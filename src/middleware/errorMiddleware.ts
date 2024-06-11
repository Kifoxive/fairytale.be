import { NextFunction, Request, Response } from "express";
import { ApiError } from "../exceptions";

export default function errorMiddleware(
  err: ApiError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // console.log(err.message);
  if (err instanceof ApiError) {
    console.log(true);
    console.log(err.status);
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: err.message });
}
