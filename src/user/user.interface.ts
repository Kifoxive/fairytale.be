import { phoneRegex } from "src/utils/enum";
import { z } from "zod";

export enum AUTH_ROLE {
  admin = "admin",
  guest = "guest",
}

// // request for reservation
// export const reservationFormSchema = () =>
//   z.object({
//     name: z.string(),
//     phone: z.string().regex(phoneRegex).or(z.literal("")).nullable(),
//     email: z.string().email(),
//     date: z.number(),
//     time: z.string(),
//     duration: z.number(),
//     personCount: z.number().nullable(),
//     note: z.string(),
//   });

// // response
// const reservationSchema = () =>
//   reservationFormSchema().extend({
//     createdAt: z.number(),
//     updatedAt: z.number(),
//     reservation_id: z.string(),
//   });

// // post reservation request
// const postReservationRequestSchema = () =>
//   z.object({
//     data: reservationSchema(),
//   });

// export type ReservationForm = z.infer<ReturnType<typeof reservationFormSchema>>;
// export type Reservation = z.infer<ReturnType<typeof reservationSchema>>;
// export type PostReservationRequest = z.infer<
//   ReturnType<typeof postReservationRequestSchema>
// >;
