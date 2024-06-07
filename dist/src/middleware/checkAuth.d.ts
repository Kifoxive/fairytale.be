import { NextFunction, Request, Response } from "express";
export default function checkAuth(req: Request<{
    headers: {
        authorization?: string;
        userId: string;
    };
}>, res: Response, next: NextFunction): void;
