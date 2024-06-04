import { phoneRegex } from "src/utils/enum";
import { z } from "zod";

export const reservationFormSchema = () =>
  z.object({
    // can be first name, second name or full name
    name: z.string(),
    // phone to contact, if email is not specified
    phone: z.string().regex(phoneRegex).or(z.literal("")).nullable(),
    // email to contact, if phone is not specified
    email: z.string().email(),
    // date to visit
    date: z.number(),
    // time to visit
    time: z.string(),
    // duration of visit
    duration: z.number(),
    // number of persons
    personCount: z.number().nullable(),
    // notes or special requests
    note: z.string(),
  });

const postReservationRequestSchema = () =>
  z.object({
    data: reservationFormSchema(),
  });

const postReservationResponseSchema = () =>
  z.object({
    data: reservationFormSchema(),
  });

export type ReservationForm = z.infer<ReturnType<typeof reservationFormSchema>>;
export type PostReservationRequest = z.infer<
  ReturnType<typeof postReservationRequestSchema>
>;
export type PostReservationResponse = z.infer<
  ReturnType<typeof postReservationResponseSchema>
>;
