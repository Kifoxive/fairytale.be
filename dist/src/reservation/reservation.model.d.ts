import mongoose from "mongoose";
declare const ReservationModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    date: number;
    name: string;
    status: "waiting" | "cancelled" | "successful";
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
    email: string;
    date: number;
    name: string;
    status: "waiting" | "cancelled" | "successful";
    time: string;
    duration: number;
    personCount: number;
    phone?: string;
    note?: string;
}>>;
export default ReservationModel;
