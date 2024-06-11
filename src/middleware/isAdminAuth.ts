import { validateAccessToken } from "../services/token-service";
import ApiError from "../exceptions/api-error";
import { NextFunction, Request, Response } from "express";
import { AUTH_ROLE } from "../user/user.interface";

export default function isAdminAuth(
  req: Request<{ headers: { authorization?: string; userId: string } }>,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.replace(/Bearer\s?/, "");
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    if (userData.role !== AUTH_ROLE["admin"]) {
      return next(ApiError.Forbidden());
    }

    req.headers.authorization = userData.user_id;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
}
