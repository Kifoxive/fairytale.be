import mongoose from "mongoose";
declare const ReservationModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    date: number;
    status: "waiting" | "cancelled" | "successful";
    email: string;
    time: string;
    duration: number;
    personCount: number;
    phone?: string;
    note?: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    date: number;
    status: "waiting" | "cancelled" | "successful";
    email: string;
    time: string;
    duration: number;
    personCount: number;
    phone?: string;
    note?: string;
}>>;
export default ReservationModel;
