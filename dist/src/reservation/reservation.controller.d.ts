import { NextFunction, Request, Response } from "express";
export declare function postReservation(req: Request<any>, res: Response, next: NextFunction): Promise<Response>;
export declare function getAllReservations(req: Request<any>, res: Response): Promise<void>;
export declare function changeReservationStatus(req: Request<any>, res: Response): Promise<void>;
