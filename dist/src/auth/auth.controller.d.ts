import express, { NextFunction, Request, Response } from "express";
export declare function registerUser(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function loginUser(req: Request, res: Response, next: NextFunction): Promise<express.Response<any, Record<string, any>>>;
export declare function refresh(req: Request, res: Response, next: NextFunction): Promise<express.Response<any, Record<string, any>>>;
export declare function getMe(req: Request<{
    headers: {
        authorization: string;
        userId: string;
    };
}>, res: Response, next: NextFunction): Promise<void>;
