"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationDto = void 0;
function ReservationDto(
//   model: Reservation & {
//     createdAt: NativeDate;
//     updatedAt: NativeDate;
//     _id: string;
//   }
model) {
    return {
        name: model.name,
        date: model.date,
        phone: model.phone,
        email: model.email,
        time: model.time,
        duration: model.duration,
        personCount: model.personCount,
        note: model.note,
        createdAt: new Date(model.createdAt).getTime(),
        updatedAt: new Date(model.updatedAt).getTime(),
        reservation_id: model._id,
    };
}
exports.ReservationDto = ReservationDto;
//# sourceMappingURL=reservation.dtos.js.map