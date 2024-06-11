import { z } from "zod";
export declare enum RESERVATION_STATUS {
    waiting = "waiting",
    cancelled = "cancelled",
    successful = "successful"
}
export declare const reservationFormSchema: () => z.ZodObject<{
    name: z.ZodString;
    phone: z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodLiteral<"">]>>;
    email: z.ZodString;
    date: z.ZodNumber;
    time: z.ZodString;
    duration: z.ZodNumber;
    personCount: z.ZodNullable<z.ZodNumber>;
    note: z.ZodString;
}, "strip", z.ZodTypeAny, {
    phone?: string;
    date?: number;
    name?: string;
    email?: string;
    time?: string;
    duration?: number;
    personCount?: number;
    note?: string;
}, {
    phone?: string;
    date?: number;
    name?: string;
    email?: string;
    time?: string;
    duration?: number;
    personCount?: number;
    note?: string;
}>;
declare const postReservationRequestSchema: () => z.ZodObject<{
    data: z.ZodObject<{
        name: z.ZodString;
        phone: z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodLiteral<"">]>>;
        email: z.ZodString;
        date: z.ZodNumber;
        time: z.ZodString;
        duration: z.ZodNumber;
        personCount: z.ZodNullable<z.ZodNumber>;
        note: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        phone?: string;
        date?: number;
        name?: string;
        email?: string;
        time?: string;
        duration?: number;
        personCount?: number;
        note?: string;
    }, {
        phone?: string;
        date?: number;
        name?: string;
        email?: string;
        time?: string;
        duration?: number;
        personCount?: number;
        note?: string;
    }>;
}, "strip", z.ZodTypeAny, {
    data?: {
        phone?: string;
        date?: number;
        name?: string;
        email?: string;
        time?: string;
        duration?: number;
        personCount?: number;
        note?: string;
    };
}, {
    data?: {
        phone?: string;
        date?: number;
        name?: string;
        email?: string;
        time?: string;
        duration?: number;
        personCount?: number;
        note?: string;
    };
}>;
export type ReservationForm = z.infer<ReturnType<typeof reservationFormSchema>>;
export type PostReservationRequest = z.infer<ReturnType<typeof postReservationRequestSchema>>;
export {};
