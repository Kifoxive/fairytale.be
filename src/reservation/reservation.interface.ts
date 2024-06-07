import { phoneRegex } from "src/utils/enum";
import { z } from "zod";

// request for reservation
export const reservationFormSchema = () =>
  z.object({
    name: z.string(),
    phone: z.string().regex(phoneRegex).or(z.literal("")).nullable(),
    email: z.string().email(),
    date: z.number(),
    time: z.string(),
    duration: z.number(),
    personCount: z.number().nullable(),
    note: z.string(),
  });

// post reservation request
const postReservationRequestSchema = () =>
  z.object({
    data: reservationFormSchema(),
  });

export type ReservationForm = z.infer<ReturnType<typeof reservationFormSchema>>;
export type PostReservationRequest = z.infer<
  ReturnType<typeof postReservationRequestSchema>
>;
