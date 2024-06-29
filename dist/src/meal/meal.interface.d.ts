import { z } from "zod";
import { Schema } from "mongoose";
export declare const postMealRequestSchema: () => z.ZodObject<{
    data: z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
        price: z.ZodNumber;
        weight: z.ZodString;
        allergens: z.ZodArray<z.ZodString, "many">;
        mealCategory_id: z.ZodString;
        imgUrl: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        description?: string;
        price?: number;
        weight?: string;
        allergens?: string[];
        mealCategory_id?: string;
        imgUrl?: string;
    }, {
        name?: string;
        description?: string;
        price?: number;
        weight?: string;
        allergens?: string[];
        mealCategory_id?: string;
        imgUrl?: string;
    }>;
}, "strip", z.ZodTypeAny, {
    data?: {
        name?: string;
        description?: string;
        price?: number;
        weight?: string;
        allergens?: string[];
        mealCategory_id?: string;
        imgUrl?: string;
    };
}, {
    data?: {
        name?: string;
        description?: string;
        price?: number;
        weight?: string;
        allergens?: string[];
        mealCategory_id?: string;
        imgUrl?: string;
    };
}>;
export type PostMealRequest = z.infer<ReturnType<typeof postMealRequestSchema>>;
export type IMeal = {
    meal_id: Schema.Types.ObjectId;
    name: string;
    price: number;
    weight: string;
    allergens: string[];
    description: string | null;
    order: number;
    mealCategory_id: string;
    imgUrl: string;
    show: boolean;
};
