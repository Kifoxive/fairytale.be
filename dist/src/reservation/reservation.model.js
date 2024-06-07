"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ReservationSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    date: {
        type: Number,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    personCount: {
        type: Number,
        required: true,
    },
    note: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});
// export const reservationFormSchema = (t: T) =>
//     z.object({
//         // can be first name, second name or full name
//         name: z.string({
//             invalid_type_error: t('form.errors.stringFormat'),
//             required_error: t('form.errors.required'),
//         }),
//         // phone to contact, if email is not specified
//         phone: z.string().regex(phoneRegex, t('form.errors.phoneFormat')).or(z.literal('')).nullable(),
//         // email to contact, if phone is not specified
//         email: z.string().email({
//             message: t('form.errors.emailFormat'),
//         }),
//         // date to visit
//         date: z.number(),
//         // time to visit
//         time: z.string(),
//         // duration of visit
//         duration: z.number(),
//         // number of persons
//         personCount: z.number().nullable(),
//         // notes or special requests
//         note: z.string(),
//     });
const ReservationModel = mongoose_1.default.model("Reservation", ReservationSchema);
exports.default = ReservationModel;
//# sourceMappingURL=reservation.model.js.map