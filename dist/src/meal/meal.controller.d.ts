import { NextFunction, Request, Response } from "express";
export declare function getAllMeals(req: Request<any>, res: Response): Promise<void>;
export declare function getOneMeal(req: Request<any>, res: Response): Promise<void>;
export declare function postMeal(req: Request<any>, res: Response, next: NextFunction): Promise<Response>;
export declare function updateMeal(req: Request<any>, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function uploadMealFile(req: Request<any>, res: Response): Promise<Response<any, Record<string, any>>>;
