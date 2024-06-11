"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reservationFormSchema = exports.RESERVATION_STATUS = void 0;
const enum_1 = require("src/utils/enum");
const zod_1 = require("zod");
var RESERVATION_STATUS;
(function (RESERVATION_STATUS) {
    RESERVATION_STATUS["waiting"] = "waiting";
    RESERVATION_STATUS["cancelled"] = "cancelled";
    RESERVATION_STATUS["successful"] = "successful";
})(RESERVATION_STATUS = exports.RESERVATION_STATUS || (exports.RESERVATION_STATUS = {}));
// request for reservation
const reservationFormSchema = () => zod_1.z.object({
    name: zod_1.z.string(),
    phone: zod_1.z.string().regex(enum_1.phoneRegex).or(zod_1.z.literal("")).nullable(),
    email: zod_1.z.string().email(),
    date: zod_1.z.number(),
    time: zod_1.z.string(),
    duration: zod_1.z.number(),
    personCount: zod_1.z.number().nullable(),
    note: zod_1.z.string(),
});
exports.reservationFormSchema = reservationFormSchema;
// post reservation request
const postReservationRequestSchema = () => zod_1.z.object({
    data: (0, exports.reservationFormSchema)(),
});
//# sourceMappingURL=reservation.interface.js.map