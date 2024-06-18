import { z } from "zod";
import { Schema } from "mongoose";
export declare const postMealCategoryRequestSchema: () => z.ZodObject<{
    data: z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
        subMealCategoriesId: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        description?: string;
        name?: string;
        subMealCategoriesId?: string[];
    }, {
        description?: string;
        name?: string;
        subMealCategoriesId?: string[];
    }>;
}, "strip", z.ZodTypeAny, {
    data?: {
        description?: string;
        name?: string;
        subMealCategoriesId?: string[];
    };
}, {
    data?: {
        description?: string;
        name?: string;
        subMealCategoriesId?: string[];
    };
}>;
export type PostMealCategoryRequest = z.infer<ReturnType<typeof postMealCategoryRequestSchema>>;
export type IMealCategory = {
    mealCategory_id: Schema.Types.ObjectId;
    name: string;
    description: string | null;
    subMealCategoriesId: Schema.Types.ObjectId[];
    show: boolean;
    order: number | null;
};
