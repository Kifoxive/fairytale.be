export type ReservationDto = {
    name: string;
    date: number;
    phone: string | null;
    email: string;
    time: string;
    duration: number;
    personCount: number | null;
    note: string | null;
    createdAt: number;
    updatedAt: number;
    reservation_id: string;
};
export declare function ReservationDto(model: any): ReservationDto;
