import { RESERVATION_STATUS } from "./reservation.interface";

export type IReservation = {
  name: string;
  date: number;
  phone: string | null;
  email: string;
  time: string;
  duration: number;
  personCount: number | null;
  note: string | null;
  status: RESERVATION_STATUS;
  createdAt: number;
  updatedAt: number;
  reservation_id: string;
};

export function ReservationDto(
  //   model: Reservation & {
  //     createdAt: NativeDate;
  //     updatedAt: NativeDate;
  //     _id: string;
  //   }
  model: any
): IReservation {
  return {
    name: model.name,
    date: model.date,
    phone: model.phone,
    email: model.email,
    time: model.time,
    duration: model.duration,
    personCount: model.personCount,
    note: model.note,
    status: model.status,
    createdAt: new Date(model.createdAt).getTime(),
    updatedAt: new Date(model.updatedAt).getTime(),
    reservation_id: model._id,
  };
}
