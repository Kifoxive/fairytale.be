import { NextFunction, Request, Response } from "express";
import { ApiError } from "../exceptions";
export default function errorMiddleware(err: ApiError | Error, req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>>;
