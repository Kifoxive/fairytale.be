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
export declare function ReservationDto(model: any): IReservation;
