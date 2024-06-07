import { NextFunction, Request, Response } from "express";
export declare function postReservation(req: Request, res: Response, next: NextFunction): Promise<Response>;
export declare function getAllReservations(req: Request, res: Response): Promise<void>;
