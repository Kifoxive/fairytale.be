import { NextFunction, Request, Response } from "express";
export default function isAdminAuth(req: Request<{
    headers: {
        authorization?: string;
        userId: string;
    };
}>, res: Response, next: NextFunction): void;
