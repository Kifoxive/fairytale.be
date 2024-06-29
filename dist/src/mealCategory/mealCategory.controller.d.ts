import { NextFunction, Request, Response } from "express";
export declare function getAllMealCategories(req: Request<any>, res: Response): Promise<void>;
export declare function getMealCategoriesList(req: Request<any>, res: Response): Promise<void>;
export declare function getMenu(req: Request<any>, res: Response): Promise<void>;
export declare function getOneMealCategory(req: Request<any>, res: Response): Promise<void>;
export declare function postMealCategory(req: Request<any>, res: Response, next: NextFunction): Promise<Response>;
export declare function updateMealCategory(req: Request<any>, res: Response): Promise<Response<any, Record<string, any>>>;
