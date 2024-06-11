import mongoose from "mongoose";
declare const UserModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    firstName: string;
    passwordHash: string;
    role: "admin" | "guest";
    isActivated: boolean;
    lastName?: string;
    phone?: string;
    avatarUrl?: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    firstName: string;
    passwordHash: string;
    role: "admin" | "guest";
    isActivated: boolean;
    lastName?: string;
    phone?: string;
    avatarUrl?: string;
}>>;
export default UserModel;
