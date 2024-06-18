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
        description?: string;
        name?: string;
        price?: number;
        weight?: string;
        allergens?: string[];
        mealCategory_id?: string;
        imgUrl?: string;
    }, {
        description?: string;
        name?: string;
        price?: number;
        weight?: string;
        allergens?: string[];
        mealCategory_id?: string;
        imgUrl?: string;
    }>;
}, "strip", z.ZodTypeAny, {
    data?: {
        description?: string;
        name?: string;
        price?: number;
        weight?: string;
        allergens?: string[];
        mealCategory_id?: string;
        imgUrl?: string;
    };
}, {
    data?: {
        description?: string;
        name?: string;
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
