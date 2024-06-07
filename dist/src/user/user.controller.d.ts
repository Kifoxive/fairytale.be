import { Request, Response } from "express";
export declare function getAllUsers(req: Request, res: Response): Promise<void>;
export declare function getEmailAvailability(req: Request<{
    headers: {
        authorization?: string;
    };
}>, res: Response): Promise<void>;
